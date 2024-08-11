export * from './styles';

export { default as ButtonBase } from './ButtonBase';
export * from './ButtonBase';

export { default as Button } from './Button';
export * from './Button';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';

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
