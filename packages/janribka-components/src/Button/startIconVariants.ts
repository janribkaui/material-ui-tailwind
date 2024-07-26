import { tv } from 'tailwind-variants';

import commonIconStyleVariants from './commIconStyleVariants';

const startIconVariants = tv({
  extend: commonIconStyleVariants,
  base: 'mr-2 -ml-1',
  variants: {
    size: {
      small: '-ml-0.5',
    },
  },
});

export default startIconVariants;
