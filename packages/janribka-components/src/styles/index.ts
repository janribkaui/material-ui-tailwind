// Types
export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

// Content
export { default as createPalette } from './createPalette';
export * from './createPalette';

export { default as createTheme, createJrTheme } from './createTheme';
export * from './createTheme';

export { default as createTransitions, duration, easing } from './createTransitions';
export * from './createTransitions';

export { default as THEME_ID } from './identifier';

export { default as styled } from './styled';

export { default as ThemeProvider } from './ThemeProvider';

export { default as useTheme } from './useTheme';
