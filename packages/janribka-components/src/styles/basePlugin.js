import plugin from 'tailwindcss/plugin';

const buildVariant = (theme, fontWeight, size, lineHeight, letterSpacing, casing) => {
  return {
    // fontFamily: theme('fontFamily.display'),
    fontWeight: fontWeight,
    fontSize: size,
    lineHeight: lineHeight,
    letterSpacing: letterSpacing,
    textTransform: casing,
  };
};

const basePlugin = plugin.withOptions(
  () => {
    return ({ addBase, theme }) => {
      return addBase({
        '*': {
          outlineColor: 'currentColor',
        },
        'html, body': {
          height: '100%',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          '-webkit-tap-highlight-color': 'transparent',
        },
        h1: buildVariant(
          theme,
          theme('fontWeight.light'),
          theme('fontSize.8xl'),
          ddd theme('lineHeight.11'),
          asds theme('letterSpacing.tight'),
        ),
      });
    };
  },
  () => {
    return {
      darkMode: 'class',
    };
  },
);

export default basePlugin;
