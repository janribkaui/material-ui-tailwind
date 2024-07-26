import { tv } from 'tailwind-variants';

export const rippleChildVariants = tv({
  base: 'opacity-1 block w-full h-full rounded-[50%] bg-current',
  variants: {
    childLeaving: { true: 'opacity-0 animation-leaving', false: '' },
    pulsate: {
      true: 'absolute top-0 left-0 animation-pulsate',
      false: '',
    },
  },
  defaultVariants: { childLeaving: false, pulsate: false },
});
