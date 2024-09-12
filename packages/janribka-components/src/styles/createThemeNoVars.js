import deepmerge from '@janribka/utils/deepmerge';
// import styleFunctionSx, {
//   unstable_defaultSxConfig as defaultSxConfig,
// } from '@mui/system/styleFunctionSx';
import systemCreateTheme from '@janribka/system/createTheme';
import JRError from '@janribka/internal-babel-macros/JRError.macro';
import generateUtilityClass from '@janribka/utils/generateUtilityClass';
// import createMixins from './createMixins';
import createPalette from './createPalette';
// import createTypography from './createTypography';
// import shadows from './shadows';
import createTransitions from './createTransitions';
// import zIndex from './zIndex';

function createThemeNoVars(options = {}, ...args) {
  const {
    // breakpoints: breakpointsInput,
    // mixins: mixinsInput = {},
    // spacing: spacingInput,
    palette: paletteInput = {},
    // transitions: transitionsInput = {},
    // typography: typographyInput = {},
    // shape: shapeInput,
    ...other
  } = options;

  if (options.vars) {
    throw new JRError(
      'JR: `vars` is a private field used for CSS variables support.\n' +
        'Please use another name.',
    );
  }

  const palette = createPalette(paletteInput);
  const systemTheme = systemCreateTheme(options);

  let jrTheme = deepmerge(systemTheme, {
    // mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    // shadows: shadows.slice(),
    // typography: createTypography(palette, typographyInput),
    // transitions: createTransitions(transitionsInput),
    // zIndex: { ...zIndex },
  });

  jrTheme = deepmerge(jrTheme, other);
  jrTheme = args.reduce((acc, argument) => deepmerge(acc, argument), jrTheme);

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

    const traverse = (node, component) => {
      let key;

      // eslint-disable-next-line guard-for-in
      for (key in node) {
        const child = node[key];
        if (stateClasses.includes(key) && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = generateUtilityClass('', key);
            console.error(
              [
                `JR: The \`${component}\` component increases ` +
                  `the CSS specificity of the \`${key}\` internal state.`,
                'You can not override it like this: ',
                JSON.stringify(node, null, 2),
                '',
                `Instead, you need to use the '&.${stateClass}' syntax:`,
                JSON.stringify(
                  {
                    root: {
                      [`&.${stateClass}`]: child,
                    },
                  },
                  null,
                  2,
                ),
                '',
                'https://mui.com/r/state-classes-guide',
              ].join('\n'),
            );
          }
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };

    Object.keys(jrTheme.components).forEach((component) => {
      const styleOverrides = jrTheme.components[component].styleOverrides;

      if (styleOverrides && component.startsWith('JR')) {
        traverse(styleOverrides, component);
      }
    });
  }

  // muiTheme.unstable_sxConfig = {
  //   ...defaultSxConfig,
  //   ...other?.unstable_sxConfig,
  // };
  // muiTheme.unstable_sx = function sx(props) {
  //   return styleFunctionSx({
  //     sx: props,
  //     theme: this,
  //   });
  // };

  return jrTheme;
}

let warnedOnce = false;

export function createJRTheme(...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(
        [
          'JR: the createJRTheme function was renamed to createTheme.',
          '',
          "You should use `import { createTheme } from '@janribka/components/styles'`",
        ].join('\n'),
      );
    }
  }

  return createThemeNoVars(...args);
}

export default createThemeNoVars;
