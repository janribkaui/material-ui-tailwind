import deepmerge from '@janribka/utils/deepmerge';

import { Transitions, TransitionsOptions } from '../createTransitions';

// Types
export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  //   shape?: ShapeOptions;
  //   breakpoints?: BreakpointsOptions;
  direction?: Direction;
  //   mixins?: unknown;
  palette?: Record<string, any>;
  // shadows?: unknown;
  //   spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  //   components?: Record<string, any>;
  //   typography?: unknown;
  //   zIndex?: Record<string, number>;
}

export interface Theme {
  // shape: Shape;
  // breakpoints: Breakpoints;
  direction: Direction;
  mixins?: unknown;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  // shadows?: unknown;
  // spacing: Spacing;
  transitions?: Transitions;
  // components?: Record<string, any>;
  // typography?: unknown;
  // zIndex?: unknown;
  // applyStyles: ApplyStyles<'light' | 'dark'>;
}

// Content

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: Theme[]): Theme {
  const {
    // breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    // spacing: spacingInput,
    // shape: shapeInput = {},
    ...other
  } = options ?? {};

  //   const breakpoints = createBreakpoints(breakpointsInput);
  //   const spacing = createSpacing(spacingInput);

  let theme = deepmerge<Theme>(
    {
      // breakpoints,
      direction: 'ltr',
      // components: {}, // Inject component definitions.
      palette: { mode: 'light', ...paletteInput },
      // spacing,
      // shape: { ...shape, ...shapeInput },
    },
    other,
  );
  // theme = cssContainerQueries(theme);

  // theme.applyStyles = applyStyles;

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  // theme.unstable_sxConfig = {
  //   ...defaultSxConfig,
  //   ...other?.unstable_sxConfig,
  // };
  // theme.unstable_sx = function sx(props) {
  //   return styleFunctionSx({
  //     sx: props,
  //     theme: this,
  //   });
  // };

  return theme;
}
