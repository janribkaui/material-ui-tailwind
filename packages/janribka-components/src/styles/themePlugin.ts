import plugin from 'tailwindcss/plugin';

import createColors from './createColors';

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
    return { darkMode: 'class', theme: { colors: createColors() } };
  },
);

export default themePlugin;
