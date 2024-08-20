import { createMacro, MacroError, MacroParams } from 'babel-plugin-macros';
import * as fs from 'fs';

import * as helperModuleImports from '@babel/helper-module-imports';

/**
 * Inverts an object, swapping keys and values.
 *
 * @param object - The object to invert
 * @returns A new object with keys and values swapped
 */
function invertObject(object: Record<string, string>): Record<string, string> {
  const inverted: Record<string, string> = {};
  Object.keys(object).forEach((key) => {
    inverted[object[key]] = key;
  });
  return inverted;
}

export class JRError {
  constructor(
    public message: string,
    ...args: string[]
  ) {}
}

// export default class JRError {
//   constructor(
//     public message: string,
//     ...args: string[]
//   ) {}
// }

/**
 * Macro function to handle error messages and codes.
 *
 * @param param0 - Macro parameters including references, babel, config, and source
 */
function jrError({ references, babel, config, source }: MacroParams) {
  const { errorCodesPath = '', missingError = 'annotate' } = config as {
    errorCodesPath: string;
    missingError: string;
  };
  const errorCodes: Record<string, string> = JSON.parse(
    fs.readFileSync(errorCodesPath, { encoding: 'utf8' }),
  );
  const errorCodesLookup = invertObject(errorCodes);
  let updatedErrorCodes = false;

  type HandleMissingErrorCode = (params: {
    devMessage: any;
    errorMessageLiteral: string;
    newExpressionPath: any;
  }) => void | number;

  let handleMissingErrorCode: HandleMissingErrorCode;

  switch (missingError) {
    case 'annotate':
      handleMissingErrorCode = ({ devMessage, newExpressionPath }) => {
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
   * @param node - The babel node to evaluate
   * @returns The evaluated string
   */
  function evaluateMessage(node: any): string {
    if (babel.types.isBinaryExpression(node)) {
      if (node.operator !== '+') {
        throw new Error(`Unsupported binary operator '${node.operator}'. Can only evaluate '+'.`);
      }
      return `${evaluateMessage(node.left)}${evaluateMessage(node.right)}`;
    }
    if (babel.types.isStringLiteral(node)) {
      return node.value;
    }
    throw new Error('Can only evaluate strings that are concatenated with `+` or string literals.');
  }

  let formatJRErrorMessageIdentifier: any = null;

  references.default.forEach((babelPath: any) => {
    const newExpressionPath = babelPath.parentPath;
    if (!newExpressionPath.isNewExpression()) {
      throw new MacroError(
        'Encountered `JRError` outside of a "new expression" i.e. `new JRError()`. Use `throw new JRError(message)` over `throw JRError(message)`.',
      );
    }

    const errorMessageLiteral = evaluateMessage(newExpressionPath.node.arguments[0]);
    const errorMessageExpressions = newExpressionPath.node.arguments.slice(1);
    const errorMessageQuasis = errorMessageLiteral
      .split('%s')
      .map((cooked: string) =>
        babel.types.templateElement({ raw: cooked.replace(/`/g, '\\`'), cooked }),
      );

    const devMessage = babel.types.templateLiteral(errorMessageQuasis, errorMessageExpressions);

    let errorCode = errorCodesLookup[errorMessageLiteral];
    if (errorCode === undefined) {
      errorCode = handleMissingErrorCode({ devMessage, errorMessageLiteral, newExpressionPath });
      if (errorCode === undefined) {
        return;
      }
    }
    errorCode = parseInt(errorCode, 10);

    if (formatJRErrorMessageIdentifier === null) {
      const isBareImportSourceIdentifier = source.startsWith('@janribka/internal-babel-macros');
      if (isBareImportSourceIdentifier) {
        formatJRErrorMessageIdentifier = helperModuleImports.addDefault(
          babelPath,
          '@janribka/utils/formatJRErrorMessage',
          { nameHint: '_formatJrErrorMessage' },
        );
      } else {
        throw new Error('Only package imports from @janribka/internal-babel-macros are supported');
      }
    }

    const prodMessage = babel.types.callExpression(
      babel.types.cloneDeep(formatJRErrorMessageIdentifier),
      [babel.types.numericLiteral(errorCode), ...errorMessageExpressions],
    );

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

export default createMacro(jrError, {
  configName: 'jrError',
});
