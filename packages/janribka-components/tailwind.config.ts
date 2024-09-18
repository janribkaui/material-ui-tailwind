import type { Config } from 'tailwindcss';
import { RecursiveKeyValuePair } from 'tailwindcss/types/config';

import blue from '@janribka/components/colors/blue';
import common from '@janribka/components/colors/common';
import green from '@janribka/components/colors/green';
import lightBlue from '@janribka/components/colors/lightBlue';
import orange from '@janribka/components/colors/orange';
import purple from '@janribka/components/colors/purple';
import red from '@janribka/components/colors/red';
import themePlugin from '@janribka/components/styles/themePlugin';

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

const light: RecursiveKeyValuePair<string, string> = {
  // The primary color of the app.
  primary: {
    light: blue[400],
    DEFAULT: blue[700],
    dark: blue[800],
  },
  // The secondary color of the app.
  secondary: {
    light: purple[300],
    DEFAULT: purple[500],
    dark: purple[700],
  },
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: common.white,
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: '0.04',
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: '0.08',
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: '0.38',
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: '0.12',
    activatedOpacity: '0.12',
  },
  error: {
    light: red[400],
    DEFAULT: red[700],
    dark: red[800],
  },
  info: {
    light: lightBlue[500],
    DEFAULT: lightBlue[900],
    dark: lightBlue[900],
  },
  success: {
    light: green[500],
    DEFAULT: green[800],
    dark: green[900],
  },
  warning: {
    light: orange[500],
    DEFAULT: '#ed6c02', // closest to orange[800] that pass 3:1.
    dark: orange[900],
  },
};

const dark: RecursiveKeyValuePair<string, string> = {
  // The primary color of the app.
  primary: {
    light: blue[50],
    DEFAULT: blue[200],
    dark: blue[400],
  },
  // The secondary color of the app.
  secondary: {
    light: purple[50],
    DEFAULT: purple[200],
    dark: purple[400],
  },
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212',
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: '0.08',
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: '0.16',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: '0.38',
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: '0.12',
    activatedOpacity: '0.24',
  },
  error: {
    light: red[300],
    DEFAULT: red[500],
    dark: red[700],
  },
  info: {
    light: lightBlue[300],
    DEFAULT: lightBlue[400],
    dark: lightBlue[700],
  },
  success: {
    light: green[300],
    DEFAULT: green[400],
    dark: green[700],
  },
  warning: {
    light: orange[300],
    DEFAULT: orange[400],
    dark: orange[700],
  },
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
      },
      transitionDuration: {
        ...duration,
      },
      transitionTimingFunction: {
        ...easing,
      },
    },
  },
  plugins: [themePlugin({})],
};

export default config;
