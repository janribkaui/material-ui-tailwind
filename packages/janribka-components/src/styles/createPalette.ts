import JRError from '@janribka/internal-babel-macros/JRError.macro';
import { darken, getContrastRatio, lighten } from '@janribka/system/colorManipulator';
import deepmerge from '@janribka/utils/deepmerge';

import { Color } from '../';
import blue from '../colors/blue';
import common from '../colors/common';
import green from '../colors/green';
import grey from '../colors/grey';
import lightBlue from '../colors/lightBlue';
import orange from '../colors/orange';
import purple from '../colors/purple';
import red from '../colors/red';
import {
  Palette,
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
  PaletteTonalOffset,
  SimplePaletteColorOptions,
  TypeObject,
} from './createPaletteProps';

export const light: TypeObject = {
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
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

export const dark: TypeObject = {
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
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};

function addLightOrDark(
  intent: SimplePaletteColorOptions,
  direction: keyof SimplePaletteColorOptions,
  shade: keyof Color,
  tonalOffset: PaletteTonalOffset,
) {
  const tonalOffsetLight =
    typeof tonalOffset === 'object' ? tonalOffset.light || tonalOffset : tonalOffset;
  const tonalOffsetDark =
    typeof tonalOffset === 'object'
      ? tonalOffset.dark || (tonalOffset as unknown as number) * 1.5
      : tonalOffset;

  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade as keyof SimplePaletteColorOptions] || '';
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight as number);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}

function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400],
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800],
  };
}

function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400],
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700],
  };
}

function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: red[500],
      light: red[300],
      dark: red[700],
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800],
  };
}

function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700],
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900],
  };
}

function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: green[400],
      light: green[300],
      dark: green[700],
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900],
  };
}

function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700],
    };
  }
  return {
    main: '#ed6c02', // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900],
  };
}

export default function createPalette(palette: PaletteOptions) {
  const { mode = 'light', contrastThreshold = 3, tonalOffset = 0.2, ...other } = palette;

  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);

  // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
  function getContrastText(background: string) {
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

  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700,
  }: {
    color: PaletteColorOptions;
    name: keyof Palette;
    mainShade?: keyof Color;
    lightShade?: keyof Color;
    darkShade?: keyof Color;
  }) => {
    color = { ...color };
    if (!(color as SimplePaletteColorOptions).main && (color as Color)[mainShade]) {
      (color as SimplePaletteColorOptions).main = (color as Color)[mainShade];
    }

    if (!color.hasOwnProperty('main')) {
      throw new JRError(
        'JR: The color%s provided to augmentColor(color) is invalid.\n' +
          'The color object needs to have a `main` property or a `%s` property.',
        name ? ` (${name})` : '',
        mainShade.toString(),
      );
    }

    if (typeof (color as SimplePaletteColorOptions).main !== 'string') {
      throw new JRError(
        'JR: The color%s provided to augmentColor(color) is invalid.\n' +
          '`color.main` should be a string, but `%s` was provided instead.\n' +
          '\n' +
          'Did you intend to use one of the following approaches?\n' +
          '\n' +
          'import { green } from "@janribka/material/colors";\n' +
          '\n' +
          'const theme1 = createTheme({ palette: {\n' +
          '  primary: green,\n' +
          '} });\n' +
          '\n' +
          'const theme2 = createTheme({ palette: {\n' +
          '  primary: { main: green[500] },\n' +
          '} });',
        name ? ` (${name})` : '',
        JSON.stringify((color as SimplePaletteColorOptions).main),
      );
    }

    addLightOrDark(color as SimplePaletteColorOptions, 'light', lightShade, tonalOffset);
    addLightOrDark(color as SimplePaletteColorOptions, 'dark', darkShade, tonalOffset);
    if (!(color as SimplePaletteColorOptions).contrastText) {
      (color as SimplePaletteColorOptions).contrastText = getContrastText(
        (color as SimplePaletteColorOptions).main,
      );
    }

    return color;
  };

  const modes = { dark, light };

  if (process.env.NODE_ENV !== 'production') {
    if (!modes[mode]) {
      console.error(`JR: The palette mode \`${mode}\` is not supported.`);
    }
  }

  const paletteOutput = deepmerge(
    {
      // A collection of common colors.
      common: { ...common }, // prevent mutable object.
      // The palette mode, can be light or dark.
      mode,
      // The colors used to represent primary interface elements for a user.
      primary: augmentColor({ color: primary, name: 'primary' }),
      // The colors used to represent secondary interface elements for a user.
      secondary: augmentColor({
        color: secondary,
        name: 'secondary',
        mainShade: 'A400',
        lightShade: 'A200',
        darkShade: 'A700',
      }),
      // The colors used to represent interface elements that the user should be made aware of.
      error: augmentColor({ color: error, name: 'error' }),
      // The colors used to represent potentially dangerous actions or important messages.
      warning: augmentColor({ color: warning, name: 'warning' }),
      // The colors used to present information to the user that is neutral and not necessarily important.
      info: augmentColor({ color: info, name: 'info' }),
      // The colors used to indicate the successful completion of an action that user triggered.
      success: augmentColor({ color: success, name: 'success' }),
      // The grey colors.
      grey,
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold,
      // Takes a background color and returns the text color that maximizes the contrast.
      getContrastText,
      // Generate a rich color object.
      augmentColor,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset,
      // The light and dark mode object.
      ...modes[mode],
    },
    other,
  );

  return paletteOutput;
}
