// Types
import { DistributiveOmit } from '@janribka/types';

import { StyledComponentProps } from './styles';

export { StyledComponentProps };

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

export type PaletteMode = 'light' | 'dark';

export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

// Common
export * from './styles';

export * from './utils';

export { unstable_composeClasses } from '@janribka/utils';

export { default as generateUtilityClass } from './generateUtilityClass';
export * from './generateUtilityClass';

export { default as generateUtilityClasses } from './generateUtilityClasses';

// Components
export { default as ButtonBase } from './ButtonBase';
export * from './ButtonBase';

export { default as Button } from './Button';
export * from './Button';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';
