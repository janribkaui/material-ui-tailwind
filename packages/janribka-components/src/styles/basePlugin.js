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
          theme('lineHeight.4_67'),
          theme('letterSpacing.normal'),
        ),
        h2: buildVariant(
          theme,
          theme('fontWeight.light'),
          theme('fontSize.6xl'),
          theme('lineHeight.4_8'),
          theme('letterSpacing.normal'),
        ),
        h3: buildVariant(
          theme,
          theme('fontWeight.normal'),
          theme('fontSize.5xl'),
          theme('lineHeight.4_67'),
          theme('letterSpacing.normal'),
        ),
        h4: buildVariant(
          theme,
          theme('fontWeight.normal'),
          theme('fontSize.4xl'),
          theme('lineHeight.4_94'),
          theme('letterSpacing.normal'),
        ),
        h5: buildVariant(
          theme,
          theme('fontWeight.normal'),
          theme('fontSize.2xl'),
          theme('lineHeight.5_34'),
          theme('letterSpacing.normal'),
        ),
        h6: buildVariant(
          theme,
          theme('fontWeight.medium'),
          theme('fontSize.xl'),
          theme('lineHeight.6_4'),
          theme('letterSpacing.normal'),
        ),
        button: buildVariant(
          theme,
          theme('fontWeight.medium'),
          theme('fontSize.sm'),
          theme('lineHeight.7'),
          theme('letterSpacing.normal'),
          'uppercase',
        ),
      });
    };
  },
  () => {
    return {
      // darkMode: 'class',
    };
  },
);

export default basePlugin;
