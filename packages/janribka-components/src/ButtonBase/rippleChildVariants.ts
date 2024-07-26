import { tv } from 'tailwind-variants';

export const rippleChildVariants = tv({
  base: 'opacity-1 block w-full h-full rounded-[50%] bg-current',
  variants: {
    childLeaving: { true: 'opacity-0', false: '' },
    animation: {
      leaving: '',
    },
  },
  defaultVariants: { childLeaving: false },
});
