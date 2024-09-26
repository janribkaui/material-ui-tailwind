// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves

// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  out: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

// Follow https://m2.material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  'entering-screen': 225,
  // recommended when something is leaving screen
  'leaving-screen': 195,
};

export default function createTransitions() {
  return {
    transitionTimingFunction: {
      ...easing,
    },
    transitionDuration: {
      ...duration,
    },
  };
}
