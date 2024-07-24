import { DefaultTheme } from '@janribka/private-theming';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  /**
   * Your component tree.
   */
  children?: React.ReactNode;
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId?: string;
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: Partial<Theme>;
}

// /**
//  * This component makes the `theme` available down the React tree.
//  * It should preferably be used at **the root of your component tree**.
//  */
// export default function ThemeProvider<T = DefaultTheme>(
//   props: ThemeProviderProps<T>,
// ): React.ReactElement<ThemeProviderProps<T>>;
