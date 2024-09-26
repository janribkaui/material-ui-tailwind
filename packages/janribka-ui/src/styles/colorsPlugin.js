import plugin from 'tailwindcss/plugin';

import createColors from './createColors';

const colorsPlugin = plugin.withOptions(
  () => {
    return () => {};
  },
  () => {
    return { theme: { colors: createColors() } };
  },
);

export default colorsPlugin;
