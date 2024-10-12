'use client';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@janribkaui/utils';

export { default as capitalize } from './capitalize';
export { default as debounce } from './debounce';
export { default as isJrElement } from './isJrElement';
export { default as unstable_memoTheme } from './memoTheme';
export { default as mergeStyles } from './mergeStyles';
export { default as useEventCallback } from './useEventCallback';
export { default as useForkRef } from './useForkRef';
export { default as unstable_useId } from './useId';
export { default as useControlled } from './useControlled';

// TODO: remove this export once ClassNameGenerator is stable
// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_ClassNameGenerator = {
  configure: (generator) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        [
          'JR: `ClassNameGenerator` import from `@janribkaui/material-ui-tailwind/utils` is outdated and might cause unexpected issues.',
          '',
          "You should use `import { unstable_ClassNameGenerator } from '@janribkaui/className'` instead",
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
