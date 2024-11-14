import * as React from 'react';

import { DistributiveOmit } from '@janribkaui/types';

// From index.js
// eslint-disable-next-line import/first
import * as colors from './colors';
import { StyledComponentProps } from './styles';

export { StyledComponentProps };

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 * @deprecated will be removed in v5 for internal usage only
 */
export type StandardProps<
  ComponentProps,
  ClassKey extends string,
  Removals extends keyof ComponentProps = never,
> = DistributiveOmit<ComponentProps, 'classes' | Removals> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    ref?: ComponentProps extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
    style?: React.CSSProperties;
  };

/**
 * @internal
 * ONLY USE FROM WITHIN mui/material-ui
 *
 * Internal helper type for conform (describeConformance) components
 * However, we don't declare classes on this type.
 * It is recommended to declare them manually with an interface so that each class can have a separate JSDoc.
 */
export type InternalStandardProps<
  ComponentProps,
  Removals extends keyof ComponentProps = never,
> = DistributiveOmit<ComponentProps, 'classes' | Removals> &
  // each component declares it's classes in a separate interface for proper JSDoc
  StyledComponentProps<never> & {
    ref?: ComponentProps extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
    // TODO: Remove implicit props. Up to each component.
    className?: string;
    style?: React.CSSProperties;
  };

export namespace PropTypes {
  // keeping the type structure for backwards compat
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
}

export { colors };
export * from './styles';

export * from './utils';

export { default as Button } from './Button';
export * from './Button';

export { default as ButtonBase } from './ButtonBase';
export * from './ButtonBase';

// export { default as ButtonGroup } from './ButtonGroup';
// export * from './ButtonGroup';

export { default as CircularProgress } from './CircularProgress';
export * from './CircularProgress';

export { default as FormControl } from './FormControl';
export * from './FormControl';

export { default as FormControlLabel } from './FormControlLabel';
export * from './FormControlLabel';

export { default as FormGroup } from './FormGroup';
export * from './FormGroup';

export { default as FormHelperText } from './FormHelperText';
export * from './FormHelperText';

export { default as FormLabel } from './FormLabel';
export * from './FormLabel';

export { default as IconButton } from './IconButton';
export * from './IconButton';

export { default as LinearProgress } from './LinearProgress';
export * from './LinearProgress';

export { default as LoadingButton } from './LoadingButton';
export * from './LoadingButton';

export { default as Switch } from './Switch';
export * from './Switch';

export { default as TextareaAutosize } from './TextareaAutosize';
export * from './TextareaAutosize';

export { default as Typography } from './Typography';
export * from './Typography';

/**
 * @deprecated will be removed in v5.beta, please use StyledEngineProvider from @mui/material/styles instead
 */
export { StyledEngineProvider } from './styles';

export { unstable_composeClasses } from '@janribkaui/utils';

export { default as generateUtilityClass } from './generateUtilityClass';
export * from './generateUtilityClass';

export { default as generateUtilityClasses } from './generateUtilityClasses';
