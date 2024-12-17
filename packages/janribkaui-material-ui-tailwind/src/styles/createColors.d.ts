import { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

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

export {};
// use standalone interface over typeof colors/commons
// to enable module augmentation
export interface CommonColors {
  black: string;
  white: string;
}

export type ColorPartial = Partial<Color>;

export interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledOpacity: number;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

export interface TypeBackground {
  default: string;
  paper: string;
}

export type TypeDivider = string;

export type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

export interface SimplePaletteColorOptions {
  light?: string;
  DEFAULT: string;
  dark?: string;
  contrastText?: string;
}

export interface PaletteColor {
  light: string;
  DEFAULT: string;
  dark: string;
  contrastText: string;
}

export interface FilledInput {
  bg: string;
  hoverBg: string;
  disabledBg: string;
  bottomLine: string;
}

export interface TypeObject {
  primary: PaletteColor;
  secondary: PaletteColor;
  text: TypeText;
  divider: TypeDivider;
  background: TypeBackground;
  action: TypeAction;
  error: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
  filledInput: PaletteColor;
}

export const light: TypeObject;
export const dark: TypeObject;

export interface PaletteAugmentColorOptions {
  color: PaletteColorOptions;
  mainShade?: number | string;
  lightShade?: number | string;
  darkShade?: number | string;
  name?: number | string;
}

export interface Palette {
  common: CommonColors;
  grey: Color;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  text: TypeText;
  divider: TypeDivider;
  action: TypeAction;
  background: TypeBackground;
}

export interface Channels {
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
  contrastTextChannel: string;
}

export type PartialTypeObject = { [P in keyof TypeObject]?: Partial<TypeObject[P]> };

export interface PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  info?: PaletteColorOptions;
  success?: PaletteColorOptions;
  // tonalOffset?: PaletteTonalOffset;
  // contrastThreshold?: number;
  common?: Partial<CommonColors>;
  grey?: ColorPartial;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  // getContrastText?: (background: string) => string;
}

// TODO: V modelu palette chybí dark
export default function createColors(): ResolvableTo<RecursiveKeyValuePair<keyof Palette, string>>;
