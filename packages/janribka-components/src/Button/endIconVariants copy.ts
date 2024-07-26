import { tv } from 'tailwind-variants';

import commonIconStyleVariants from './commIconStyleVariants';

const endIconVariants = tv({
  extend: commonIconStyleVariants,
  base: '-mr-1 ml-2',
  variants: {
    size: {
      small: '-mr-0.5',
    },
  },
});

export default endIconVariants;
