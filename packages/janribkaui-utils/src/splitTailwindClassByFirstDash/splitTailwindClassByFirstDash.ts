// TODO: Remove this function

import JrError from '@janribkaui/internal-babel-macros/JrError.macro';

function splitTailwindClassByFirstDash(tailwindClass: string): [string, string] {
  const index = tailwindClass.indexOf('-');

  if (index === -1) {
    throw new JrError('JR: `getTailwindClassPrefix(string)` expects a tailwind class.');
  }

  const prefix = tailwindClass.slice(0, index);
  const postfix = tailwindClass.slice(index + 1);

  return [prefix, postfix];
}

export default splitTailwindClassByFirstDash;
