const fs = require('fs');
const { createMacro, MacroError } = require('babel-plugin-macros');
const helperModuleImports = require('@babel/helper-module-imports');

function invertObject(object) {
  const inverted = {};
  Object.keys(object).forEach((key) => {
    inverted[object[key]] = key;
  });
  return inverted;
}

/**
 * Supported import:
 * Bare specifier `'@janribkaui/internal-babel-macros/JrError.macro'`
 * @param {import('babel-plugin-macros').MacroParams} param0
 */
function jrError({ references, babel, config, source }) {
  const { errorCodesPath = {}, missingError = 'annotate' } = config;
  const errorCodes = JSON.parse(fs.readFileSync(errorCodesPath, { encoding: 'utf8' }));
  const errorCodesLookup = invertObject(errorCodes);
  let updatedErrorCodes = false;

  let handleMissingErrorCode;
  switch (missingError) {
    case 'annotate':
      handleMissingErrorCode = ({ devMessage, newExpressionPath }) => {
        // Outputs:
        // /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
        // throw new Error(`A message with ${interpolation}`)
        newExpressionPath.replaceWith(
          babel.types.newExpression(babel.types.identifier('Error'), [devMessage]),
        );
        newExpressionPath.addComment(
          'leading',
          ' FIXME (minify-errors-in-prod): Unminified error message in production build! ',
        );
      };
      break;
    case 'throw':
      handleMissingErrorCode = ({ errorMessageLiteral }) => {
        throw new MacroError(
          `Missing error code for message '${errorMessageLiteral}'. Did you forget to run \`pnpm extract-error-codes\` first?`,
        );
      };
      break;
    case 'write':
      handleMissingErrorCode = ({ errorMessageLiteral }) => {
        updatedErrorCodes = true;
        // error codes are 1-based
        const newErrorCode = Object.keys(errorCodesLookup).length + 1;
        errorCodesLookup[errorMessageLiteral] = newErrorCode;
        return newErrorCode;
      };
      break;
    default:
      throw new MacroError(
        `Unknown missing error behavior '${missingError}'. Can only handle 'annotate', 'throw' and 'write'.`,
      );
  }

  /**
   * Evaluates a babel node as a string.
   *
   * Supported nodes
   * - `'just a literal'`
   * - `'a literal' + 'concatenated' + 'with +'`
   * Cannot evaluate template literals or Array.prototype.join etc.
   *
   * @param {import('@babel/core').types.Node} node
   */
  function evaluateMessage(node) {
    if (babel.types.isBinaryExpression(node)) {
      if (node.operator !== '+') {
        throw new Error(`Unsupported binary operator '${node.operator}'. Can only evaluate '+'.`);
      }
      return `${evaluateMessage(node.left, babel)}${evaluateMessage(node.right, babel)}`;
    }
    if (babel.types.isStringLiteral(node)) {
      return node.value;
    }
    throw new Error('Can only evaluate strings that are concatenated with `+` or string literals.');
  }

  /**
   * The identifier for the callee in `formatJrErrorMessage()`
   * Creating an identifier per JrError reference would create duplicate imports.
   * It's not obvious that these will be deduplicated by bundlers.
   * We can already do this at transpile-time
   *
   * @type {import('@babel/core').NodePath | null}
   */
  let formatJrErrorMessageIdentifier = null;

  references.default.forEach((babelPath) => {
    const newExpressionPath = babelPath.parentPath;
    if (!newExpressionPath.isNewExpression()) {
      throw new MacroError(
        'Encountered `JrError` outside of a "new expression" i.e. `new JrError()`. Use `throw new JrError(message)` over `throw JrError(message)`.',
      );
    }

    const errorMessageLiteral = evaluateMessage(newExpressionPath.node.arguments[0]);
    const errorMessageExpressions = newExpressionPath.node.arguments.slice(1);
    const errorMessageQuasis = errorMessageLiteral
      .split('%s')
      // Providing `cooked` here is important.
      // Otherwise babel will generate "" with NODE_ENV=test
      //
      // Original code used `cooked: String.raw({ raw: cooked })`
      // Thought it's unclear what for.
      // 'One line\nNext line' will end up as `One line
      // Next line` which is what you'd want from that literal.
      .map((cooked) => babel.types.templateElement({ raw: cooked.replace(/`/g, '\\`'), cooked }));

    // Outputs:
    //   `A ${adj} message that contains ${noun}`;
    const devMessage = babel.types.templateLiteral(errorMessageQuasis, errorMessageExpressions);

    let errorCode = errorCodesLookup[errorMessageLiteral];
    if (errorCode === undefined) {
      errorCode = handleMissingErrorCode({ devMessage, errorMessageLiteral, newExpressionPath });
      if (errorCode === undefined) {
        return;
      }
    }
    errorCode = parseInt(errorCode, 10);

    if (formatJrErrorMessageIdentifier === null) {
      const isBareImportSourceIdentifier = source.startsWith('@janribkaui/internal-babel-macros');
      if (isBareImportSourceIdentifier) {
        // Input: import JrError from '@janribkaui/internal-babel-macros/JrError.macro'
        // Outputs:
        // import { formatJrErrorMessage } from '@janribkaui/utils';
        formatJrErrorMessageIdentifier = helperModuleImports.addDefault(
          babelPath,
          '@janribkaui/utils/formatJrErrorMessage',
          { nameHint: '_formatJrErrorMessage' },
        );
      } else {
        throw new Error(
          'Only package imports from @janribkaui/internal-babel-macros are supported',
        );
      }
    }

    // Outputs:
    // formatJrErrorMessage(ERROR_CODE, adj, noun)
    const prodMessage = babel.types.callExpression(
      babel.types.cloneDeep(formatJrErrorMessageIdentifier),
      [babel.types.numericLiteral(errorCode), ...errorMessageExpressions],
    );
    // TODO: Porovnat ty zakomnetovane veci s origin8lem
    // Outputs:
    // new Error(
    //   process.env.NODE_ENV !== "production"
    //     ? `A message with ${interpolation}`
    //     : formatProdError('A message with %s', interpolation)
    // )
    newExpressionPath.replaceWith(
      babel.types.newExpression(babel.types.identifier('Error'), [
        babel.types.conditionalExpression(
          babel.types.binaryExpression(
            '!==',
            babel.types.memberExpression(
              babel.types.memberExpression(
                babel.types.identifier('process'),
                babel.types.identifier('env'),
              ),
              babel.types.identifier('NODE_ENV'),
            ),
            babel.types.stringLiteral('production'),
          ),
          devMessage,
          prodMessage,
        ),
      ]),
    );
  });

  if (missingError === 'write' && updatedErrorCodes) {
    fs.writeFileSync(errorCodesPath, JSON.stringify(invertObject(errorCodesLookup), null, 2));
  }

  return { keepImports: false };
}

module.exports = createMacro(jrError, {
  configName: 'jrError',
});
