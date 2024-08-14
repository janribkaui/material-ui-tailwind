import { DefaultTheme } from '../defaultTheme';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}
