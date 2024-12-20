/**
 * WARNING: Don't import this directly.
 * Use `JrError` from `@janribkaui/internal-babel-macros/JrError.macro` instead.
 * @param {number} code
 */
export default function formatJrErrorMessage(code: number): string {
  // Apply babel-plugin-transform-template-literals in loose mode
  // loose mode is safe if we're concatenating primitives
  // see https://babeljs.io/docs/en/babel-plugin-transform-template-literals#loose
  /* eslint-disable prefer-template */
  let url = 'https://mui.com/production-error/?code=' + code;
  for (let i = 1; i < arguments.length; i += 1) {
    // rest params over-transpile for this case
    // eslint-disable-next-line prefer-rest-params
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }
  return 'Minified JR error #' + code + '; visit ' + url + ' for the full message.';
  /* eslint-enable prefer-template */
}
