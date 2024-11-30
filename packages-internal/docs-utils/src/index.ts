import { EOL } from 'os';

export * from './createTypeScriptProject';
export { type ComponentClassDefinition } from './ComponentClassDefinition';
export * from './getPropsFromComponentNode';

export function getLineFeed(source: string): string {
  const match = source.match(/\r?\n/);
  return match === null ? EOL : match[0];
}

const fixBabelIssuesRegExp = /(?<=(\/>)|,)(\r?\n){2}/g;

export function fixBabelGeneratorIssues(source: string): string {
  return source.replace(fixBabelIssuesRegExp, '\n');
}

export function fixLineEndings(source: string, target: string): string {
  return target.replace(/\r?\n/g, getLineFeed(source));
}

/**
 * Converts styled or regular component d.ts file to unstyled d.ts
 * @param filename - the file of the styled or regular mui component
 */
export function getUnstyledFilename(filename: string, definitionFile: boolean = false): string {
  if (filename.includes('janribkaui-base')) {
    return filename;
  }
  let unstyledFile = '';

  const separator = filename.includes('/') ? '/' : '\\';

  if (!filename.includes('janribkaui-base')) {
    unstyledFile = filename
      .replace(/.d.ts$/, '')
      .replace(/.tsx?$/, '')
      .replace(/.js$/, '');
    unstyledFile = unstyledFile.replace(/Styled/g, '');

    if (separator === '/') {
      unstyledFile = unstyledFile.replace(
        /packages\/janribkaui-lab|packages\/janribkaui-material-ui-tailwind/g,
        'packages/janribkaui-base',
      );
    } else {
      unstyledFile = unstyledFile.replace(
        /packages\\janribkaui-lab|packages\\janribkaui-material-ui-tailwind/g,
        'packages\\janribkaui-base',
      );
    }
  }

  return definitionFile ? `${unstyledFile}.d.ts` : `${unstyledFile}.js`;
}
