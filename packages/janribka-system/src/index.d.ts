// disable automatic export
export {};

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 */
export type ResponsiveStyleValue<T> = T | Array<T | null> | { [key: string]: T | null };

export { DefaultTheme } from '@janribka/private-theming';

export {
  css,
  keyframes,
  StyledEngineProvider,
  Interpolation,
  CSSInterpolation,
  CSSObject,
} from '@janribka/styled-engine';
export { default as GlobalStyles } from './GlobalStyles';
export type { GlobalStylesProps } from './GlobalStyles';

export * from './colorManipulator';

export { default as createStyled } from './createStyled';
export * from './createStyled';

export { default as createTheme } from './createTheme';
export * from './createTheme';

export { default as ThemeProvider } from './ThemeProvider';
export * from './ThemeProvider';

export { default as useTheme } from './useTheme';
export * from './useTheme';

export { default as useThemeWithoutDefault } from './useThemeWithoutDefault';
export * from './useThemeWithoutDefault';

export { default as unstable_createCssVarsProvider, CreateCssVarsProviderResult } from './cssVars';
// export { default as unstable_createGetCssVar } from './cssVars/createGetCssVar';
// export { default as unstable_cssVarsParser } from './cssVars/cssVarsParser';
// export { default as unstable_prepareCssVars } from './cssVars/prepareCssVars';
// export { default as unstable_createCssVarsTheme } from './cssVars/createCssVarsTheme';
export * from './cssVars';
