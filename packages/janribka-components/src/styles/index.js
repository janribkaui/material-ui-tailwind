export { default as THEME_ID } from './identifier';
// export { default as adaptV4Theme } from './adaptV4Theme';
export {
  hexToRgb,
  rgbToHex,
  hslToRgb,
  decomposeColor,
  recomposeColor,
  getContrastRatio,
  getLuminance,
  emphasize,
  alpha,
  darken,
  lighten,
  css,
  keyframes,
} from '@janribka/system';
// export { unstable_createBreakpoints } from '@janribka/system/createBreakpoints';
// TODO: Remove this function in v6.
// eslint-disable-next-line @typescript-eslint/naming-convention

export { default as createTheme, createJRTheme } from './createTheme';
// export { default as unstable_createMuiStrictModeTheme } from './createMuiStrictModeTheme';
// export { default as createStyles } from './createStyles';
// export { getUnit as unstable_getUnit, toUnitless as unstable_toUnitless } from './cssUtils';
// export { default as responsiveFontSizes } from './responsiveFontSizes';
export { default as createTransitions, duration, easing } from './createTransitions';
// export { default as createColorScheme } from './createColorScheme';
export { default as useTheme } from './useTheme';
// export { default as useThemeProps } from './useThemeProps';
export { default as styled } from './styled';
export { default as experimentalStyled } from './styled';
export { default as ThemeProvider } from './ThemeProvider';
export { StyledEngineProvider } from '@janribka/system';
// The legacy utilities from @mui/styles
// These are just empty functions that throws when invoked
// export { default as makeStyles } from './makeStyles';
// export { default as withStyles } from './withStyles';
// export { default as withTheme } from './withTheme';

export * from './ThemeProviderWithVars';
export { default as extendTheme } from './createThemeWithVars';
// export { default as experimental_extendTheme } from './experimental_extendTheme'; // TODO: Remove in v7
// export { default as getOverlayAlpha } from './getOverlayAlpha';
// export { default as shouldSkipGeneratingVar } from './shouldSkipGeneratingVar';

// Private methods for creating parts of the theme
export { default as private_createTypography } from './createTypography';
// export { default as private_createMixins } from './createMixins';
// export { default as private_excludeVariablesFromRoot } from './excludeVariablesFromRoot';