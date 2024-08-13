import { Theme as SystemTheme, ThemeOptions as SystemThemeOptions } from '@janribka/system';

import {
  Transitions,
  TransitionsOptions,
} from '../../../janribka-system/src/createTransitions/createTransitionsProps';
import { Palette, PaletteOptions } from './createPaletteProps';

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'> {
  // mixins?: MixinsOptions;
  // components?: Components<Omit<Theme, 'components'>>;
  palette?: PaletteOptions;
  // shadows?: Shadows;
  transitions?: TransitionsOptions;
  // typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  // zIndex?: ZIndexOptions;
  // unstable_strictMode?: boolean;
  // unstable_sxConfig?: SxConfig;
}

interface BaseTheme extends SystemTheme {
  // mixins: Mixins;
  palette: Palette;
  // shadows: Shadows;
  transitions: Transitions;
  // typography: Typography;
  // zIndex: ZIndex;
  // unstable_strictMode?: boolean;
}

// shut off automatic exporting for the `BaseTheme` above
export {};

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends BaseTheme {
  // components?: Components<BaseTheme>;
  // unstable_sx: (props: SxProps<Theme>) => CSSObject;
  // unstable_sxConfig: SxConfig;
}
