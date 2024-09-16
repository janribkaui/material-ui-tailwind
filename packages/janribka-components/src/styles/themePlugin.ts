import plugin from 'tailwindcss/plugin';

import createColors from '@janribka/components/styles/createColors';

const colors = { ...createColors() };

const themePlugin = plugin.withOptions(
  () => {
    return ({ addBase }) => {
      addBase({
        '*': {
          outlineColor: 'currentColor',
        },
        'html, body': {
          height: '100%',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      });
    };
  },
  () => {
    return { darkMode: 'class', theme: { colors: colors } };
  },
);

export default themePlugin;
