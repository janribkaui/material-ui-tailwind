import { tv } from 'tailwind-variants';

export const rippleVariants = tv({
  base: 'opacity-0 absolute',
  variants: { rippleVisible: { true: '', false: '' } },
  defaultVariants: { rippleVisible: false },
});
