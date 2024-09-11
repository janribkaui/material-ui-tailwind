'use client';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@janribka/utils';

export { default as capitalize } from './capitalize';
export { default as unstable_memoTheme } from './memoTheme';
export { default as mergeStyles } from './mergeStyles';
export { default as useEventCallback } from './useEventCallback';
export { default as useForkRef } from './useForkRef';

// TODO: remove this export once ClassNameGenerator is stable
// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_ClassNameGenerator = {
  configure: (generator) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        [
          'JR: `ClassNameGenerator` import from `@janribka/components/utils` is outdated and might cause unexpected issues.',
          '',
          "You should use `import { unstable_ClassNameGenerator } from '@janribka/components/className'` instead",
          '',
          'The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401',
          '',
          'The updated documentation: https://mui.com/guides/classname-generator/',
        ].join('\n'),
      );
    }
    ClassNameGenerator.configure(generator);
  },
};
