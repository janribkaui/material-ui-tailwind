import { tv } from 'tailwind-variants';

export const rippleVariants = tv({
  base: 'opacity-0 absolute',
  variants: {
    rippleVisible: { true: 'opacity-30 scale-100 animation-visible', false: '' },
    ripplePulsate: { true: 'animation-pulsate', false: '' },
  },
  defaultVariants: { rippleVisible: false, ripplePulsate: false },
});
