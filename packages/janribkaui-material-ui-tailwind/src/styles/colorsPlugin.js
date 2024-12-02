import plugin from 'tailwindcss/plugin';

import createColors from './createColors';

const colorsPlugin = plugin.withOptions(
  () => {
    return ({ addUtilities, theme }) => {
      const newUtilities = {
        '.webkit-text-fill-text-disabled': {
          '-webkit-text-fill-color': theme('colors.text-disabled'),
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    };
  },
  () => {
    return { theme: { colors: createColors() } };
  },
);

export default colorsPlugin;
