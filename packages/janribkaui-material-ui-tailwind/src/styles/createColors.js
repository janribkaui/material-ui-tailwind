import common from '../colors/common';
import grey from '../colors/grey';
import purple from '../colors/purple';
import red from '../colors/red';
import orange from '../colors/orange';
import blue from '../colors/blue';
import lightBlue from '../colors/lightBlue';
import green from '../colors/green';
import { getContrastRatio } from '@janribkaui/system/colorManipulator';
import amber from '../colors/amber';
import blueGrey from '../colors/blueGrey';
import brown from '../colors/brown';
import cyan from '../colors/cyan';
import deepOrange from '../colors/deepOrange';
import deepPurple from '../colors/deepPurple';
import indigo from '../colors/indigo';
import lightGreen from '../colors/lightGreen';
import lime from '../colors/lime';
import pink from '../colors/pink';
import teal from '../colors/teal';
import yellow from '../colors/yellow';

const light = {
  // The colors used to represent primary interface elements for a user.
  primary: {
    light: blue[400],
    DEFAULT: blue[700],
    dark: blue[800],
  },
  // The colors used to represent secondary interface elements for a user.
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
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
  // The colors used to represent interface elements that the user should be made aware of.
  error: {
    light: red[400],
    DEFAULT: red[700],
    dark: red[800],
  },
  // The colors used to present information to the user that is neutral and not necessarily important.
  info: {
    light: lightBlue[500],
    DEFAULT: lightBlue[900],
    dark: lightBlue[900],
  },
  // The colors used to indicate the successful completion of an action that user triggered.
  success: {
    light: green[500],
    DEFAULT: green[800],
    dark: green[900],
  },
  // The colors used to represent potentially dangerous actions or important messages.
  warning: {
    light: orange[500],
    DEFAULT: '#ed6c02', // closest to orange[800] that pass 3:1.
    dark: orange[900],
  },
};

const dark = {
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
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
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

// Get contrastText from background color.
light.primary.contrastText = getContrastText(blue[700]);
light.secondary.contrastText = getContrastText(purple[700]);
light.error.contrastText = getContrastText(red[700]);
light.info.contrastText = getContrastText(lightBlue[700]);
light.success.contrastText = getContrastText(green[700]);
light.warning.contrastText = getContrastText('#ed6c02');

dark.primary.contrastText = getContrastText(blue[200]);
dark.secondary.contrastText = getContrastText(purple[200]);
dark.error.contrastText = getContrastText(red[500]);
dark.info.contrastText = getContrastText(lightBlue[400]);
dark.success.contrastText = getContrastText(green[400]);
dark.warning.contrastText = getContrastText(orange[400]);

export function getContrastText(background, contrastThreshold = 3) {
  const contrastText =
    getContrastRatio(background, dark.text.primary) >= contrastThreshold
      ? dark.text.primary
      : light.text.primary;

  if (process.env.NODE_ENV !== 'production') {
    const contrast = getContrastRatio(background, contrastText);
    if (contrast < 3) {
      console.error(
        [
          `JR: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
          'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
          'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
        ].join('\n'),
      );
    }
  }

  return contrastText;
}

export default function createColors() {
  return {
    // A collection of common colors.
    common: { ...common }, // prevent mutable object.
    // The grey colors.
    grey,
    ...light,
    dark: {
      ...dark,
    },
    inherit: 'inherit',
    current: 'currentColor',
    transparent: 'transparent',
    amber: { ...amber },
    blue: { ...blue },

    blueGrey: { ...blueGrey },
    brown: { ...brown },
    cyan: { ...cyan },
    deepOrange: { ...deepOrange },
    deepPurple: { ...deepPurple },
    green: { ...green },
    indigo: { ...indigo },
    lightBlue: { ...lightBlue },
    lightGreen: { ...lightGreen },
    lime: { ...lime },
    orange: { ...orange },
    pink: { ...pink },
    purple: { ...purple },
    red: { ...red },
    teal: { ...teal },
    yellow: { ...yellow },
  };
}
