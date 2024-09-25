import plugin from 'tailwindcss/plugin';

import createTransitions from './createTransitions';

const colorsPlugin = plugin.withOptions(
  () => {
    return () => {};
  },
  () => {
    return { theme: { ...createTransitions() } };
  },
);

export default colorsPlugin;
