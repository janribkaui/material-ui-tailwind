import JRError from '@janribka/internal-babel-macros/JRError.macro';
// Types
import {
  Theme as SystemTheme,
  ThemeOptions as SystemThemeOptions,
  Transitions,
  TransitionsOptions,
} from '@janribka/system';
import systemCreateTheme from '@janribka/system/createTheme';
import deepmerge from '@janribka/utils/deepmerge';

import { Components } from './components';
// import styleFunctionSx, {
//   unstable_defaultSxConfig as defaultSxConfig,
// } from '@mui/system/styleFunctionSx';
// import generateUtilityClass from '@mui/utils/generateUtilityClass';
// import createMixins from './createMixins';
import createPalette, { Palette, PaletteOptions } from './createPalette';
import createTransitions from './createTransitions';

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
  components?: Components<BaseTheme>;
  // unstable_sx: (props: SxProps<Theme>) => CSSObject;
  // unstable_sxConfig: SxConfig;
}

// Content

// import createTypography from './createTypography';
// import shadows from './shadows';
// import zIndex from './zIndex';

function createTheme(options: ThemeOptions = {}, ...args: Theme[]) {
  const {
    // breakpoints: breakpointsInput,
    // mixins: mixinsInput = {},
    // spacing: spacingInput,
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    // typography: typographyInput = {},
    // shape: shapeInput,
    ...other
  } = options;

  if ((options as any).vars) {
    throw new JRError(
      'JR: `vars` is a private field used for CSS variables support.\n' +
        'Please use another name.',
    );
  }

  const palette = createPalette(paletteInput);
  const systemTheme = systemCreateTheme(options);

  let theme = deepmerge(systemTheme, {
    // mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    // shadows: shadows.slice(),
    // typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    // zIndex: { ...zIndex },
  });

  theme = deepmerge(theme, other);
  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  if (process.env.NODE_ENV !== 'production') {
    // TODO v6: Refactor to use globalStateClassesMapping from @janribka/utils once `readOnly` state class is used in Rating component.
    const stateClasses = [
      'active',
      'checked',
      'completed',
      'disabled',
      'error',
      'expanded',
      'focused',
      'focusVisible',
      'required',
      'selected',
    ];

    // const traverse = (node, component) => {
    //   let key;

    //   // eslint-disable-next-line guard-for-in
    //   for (key in node) {
    //     const child = node[key];
    //     // if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
    //     //   if (process.env.NODE_ENV !== 'production') {
    //     //     const stateClass = generateUtilityClass('', key);
    //     //     console.error(
    //     //       [
    //     //         `JR: The \`${component}\` component increases ` +
    //     //           `the CSS specificity of the \`${key}\` internal state.`,
    //     //         'You can not override it like this: ',
    //     //         JSON.stringify(node, null, 2),
    //     //         '',
    //     //         `Instead, you need to use the '&.${stateClass}' syntax:`,
    //     //         JSON.stringify(
    //     //           {
    //     //             root: {
    //     //               [`&.${stateClass}`]: child,
    //     //             },
    //     //           },
    //     //           null,
    //     //           2,
    //     //         ),
    //     //         '',
    //     //         'https://mui.com/r/state-classes-guide',
    //     //       ].join('\n'),
    //     //     );
    //     //   }
    //       // Remove the style to prevent global conflicts.
    //       node[key] = {};
    //     }
    //   }
    // };

    // Object.keys(theme.components).forEach((component) => {
    //   const styleOverrides = theme.components[component].styleOverrides;

    //   if (styleOverrides && component.indexOf('Mui') === 0) {
    //     traverse(styleOverrides, component);
    //   }
    // });
  }

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

let warnedOnce = false;

export function createMuiTheme(options?: ThemeOptions, ...args: Theme[]) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(
        [
          'JR: the createMuiTheme function was renamed to createTheme.',
          '',
          "You should use `import { createTheme } from '@mui/material/styles'`",
        ].join('\n'),
      );
    }
  }

  return createTheme(options, ...args);
}

export default createTheme;
