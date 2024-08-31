'use client';

import { DefaultTheme, ThemeProvider as SystemThemeProvider } from '@janribka/system';

import THEME_ID from './identifier';

// Types
export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

// Content
/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 * API:
 *
 * - [ThemeProvider API](https://mui.com/material-ui/customization/theming/#themeprovider)
 */
export default function ThemeProvider<Theme = DefaultTheme>(
  props: ThemeProviderProps<Theme>,
): React.ReactElement<ThemeProviderProps<Theme>> {
  // Props
  const { theme: themeInput, ...restProps } = props;

  // Constants
  const scopedTheme = (themeInput as any)[THEME_ID];

  return (
    <SystemThemeProvider themeId={scopedTheme} theme={scopedTheme || themeInput} {...restProps} />
  );
}
