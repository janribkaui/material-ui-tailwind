export interface Easing {
  'in-out': string;
  out: string;
  in: string;
  sharp: string;
}

export const easing: Easing;

export interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  'entering-screen': number;
  'leaving-screen': number;
}

export const duration: Duration;

export interface Transitions {
  transitionTimingFunction: Easing;
  transitionDuration: Duration;
}

export default function createTransitions(): Transitions;
