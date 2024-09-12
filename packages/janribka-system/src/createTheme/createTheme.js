import deepmerge from '@janribka/utils/deepmerge';
// import createBreakpoints from '../createBreakpoints/createBreakpoints';
// import cssContainerQueries from '../cssContainerQueries';
// import shape from './shape';
// import createSpacing from './createSpacing';
// import styleFunctionSx from '../styleFunctionSx/styleFunctionSx';
// import defaultSxConfig from '../styleFunctionSx/defaultSxConfig';
// import applyStyles from './applyStyles';

function createTheme(options = {}, ...args) {
  const {
    // breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    // spacing: spacingInput,
    // shape: shapeInput = {},
    ...other
  } = options;

  // const breakpoints = createBreakpoints(breakpointsInput);
  // const spacing = createSpacing(spacingInput);

  let jrTheme = deepmerge(
    {
      // breakpoints,
      direction: 'ltr',
      components: {}, // Inject component definitions.
      palette: { mode: 'light', ...paletteInput },
      // spacing,
      // shape: { ...shape, ...shapeInput },
    },
    other,
  );
  // jrTheme = cssContainerQueries(jrTheme);

  // jrTheme.applyStyles = applyStyles;

  jrTheme = args.reduce((acc, argument) => deepmerge(acc, argument), jrTheme);

  // jrTheme.unstable_sxConfig = {
  //   ...defaultSxConfig,
  //   ...other?.unstable_sxConfig,
  // };
  // jrTheme.unstable_sx = function sx(props) {
  //   return styleFunctionSx({
  //     sx: props,
  //     theme: this,
  //   });
  // };

  return jrTheme;
}

export default createTheme;
