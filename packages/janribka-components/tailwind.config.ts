import type { Config } from 'tailwindcss';
import basePlugin from '@janribka/components/styles/basePlugin';
import colorsPlugin from '@janribka/components/styles/colorsPlugin';

import { colors } from './src';

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
  shortest: '150ms',
  shorter: '200ms',
  short: '250ms',
  // most basic recommended timing
  standard: '300ms',
  // this is to be used in complex animations
  complex: '375ms',
  // recommended when something is entering screen
  enteringScreen: '225ms',
  // recommended when something is leaving screen
  leavingScreen: '195ms',
};

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'background-color': 'background-color',
        'box-shadow': 'box-shadow',
        'border-color': 'border-color',
        color: 'color',
        button: 'background-color, color, box-shadow, border-color',
      },
      transitionDuration: {
        ...duration,
      },
      transitionTimingFunction: {
        ...easing,
      },
      lineHeight: {
        '4_67': '1.167',
        '4_8': '1.2',
        '4_94': '1.235',
        '5_34': '1.334',
        '6_4': '1.6',
      },
    },
  },
  plugins: [basePlugin({}), colorsPlugin({})],
};

export default config;
