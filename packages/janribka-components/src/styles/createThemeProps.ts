import {
  CSSObject,
  SxConfig,
  SxProps,
  Theme as SystemTheme,
  ThemeOptions as SystemThemeOptions,
} from '@janribka/system';

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'> {
  mixins?: MixinsOptions;
  components?: Components<Omit<Theme, 'components'>>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  unstable_sxConfig?: SxConfig;
}
