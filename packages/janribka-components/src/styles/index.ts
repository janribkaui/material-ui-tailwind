// Types
export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

// Content
export { default as THEME_ID } from './identifier';
export * from './createThemeProps';

export { default as useTheme } from './useTheme';
