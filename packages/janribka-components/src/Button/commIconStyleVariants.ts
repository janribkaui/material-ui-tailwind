import { tv } from 'tailwind-variants';

const commonIconStyleVariants = tv({
  base: 'display-inherit',
  variants: {
    size: {
      small: 'text-lg',
      medium: 'text-xl',
      large: 'text-[22px]',
    },
  },
});

export default commonIconStyleVariants;
