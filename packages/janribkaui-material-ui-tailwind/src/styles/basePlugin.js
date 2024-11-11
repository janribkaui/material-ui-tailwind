import plugin from 'tailwindcss/plugin';
import shadows from './shadows';

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
// TODO: V2: Remove typography and make font size instead in tailwind.config
// 'h1': ['1.5rem', {
//   lineHeight: '2rem',
//   letterSpacing: '-0.01em',
//   fontWeight: '500',
// }],

const basePlugin = plugin.withOptions(
  () => {
    return ({ addBase, addVariant, theme }) => {
      addBase({
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
          theme('lineHeight.h1'),
          theme('letterSpacing.normal'),
        ),
        h2: buildVariant(
          theme,
          theme('fontWeight.light'),
          theme('fontSize.6xl'),
          theme('lineHeight.h2'),
          theme('letterSpacing.normal'),
        ),
        h3: buildVariant(
          theme,
          theme('fontWeight.normal'),
          theme('fontSize.5xl'),
          theme('lineHeight.h3'),
          theme('letterSpacing.normal'),
        ),
        h4: buildVariant(
          theme,
          theme('fontWeight.normal'),
          theme('fontSize.4xl'),
          theme('lineHeight.h4'),
          theme('letterSpacing.normal'),
        ),
        h5: buildVariant(
          theme,
          theme('fontWeight.normal'),
          theme('fontSize.2xl'),
          theme('lineHeight.h5'),
          theme('letterSpacing.normal'),
        ),
        h6: buildVariant(
          theme,
          theme('fontWeight.medium'),
          theme('fontSize.xl'),
          theme('lineHeight.h6'),
          theme('letterSpacing.normal'),
        ),
        button: buildVariant(
          theme,
          theme('fontWeight.medium'),
          theme('fontSize.sm'),
          theme('lineHeight.button'),
          theme('letterSpacing.wide'),
          'uppercase',
        ),
      });

      addVariant('hover-none', '@media (hover: none)');
    };
  },
  () => {
    return {
      theme: {
        boxShadow: {
          ...shadows,
        },
      },
      // darkMode: 'class',
    };
  },
);

export default basePlugin;
