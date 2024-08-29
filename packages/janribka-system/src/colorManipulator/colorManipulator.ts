import JRError from '@janribka/internal-babel-macros/JRError.macro';
/* eslint-disable @typescript-eslint/naming-convention */
import clamp from '@janribka/utils/clamp';

// Types
export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'color';
export interface ColorObject {
  type: ColorFormat;
  values: [number, number, number] | [number, number, number, number | string];
  colorSpace?: 'srgb' | 'display-p3' | 'a98-rgb' | 'prophoto-rgb' | 'rec-2020';
}

// Content

/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clampWrapper(value: number, min: number = 0, max: number = 1): number {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(`JR: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }

  return clamp(value, min, max);
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
export function hexToRgb(color: string): string {
  color = color.slice(1);

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors: RegExpMatchArray | null | string[] = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
        .map((n, index) => {
          return index < 3 ? parseInt(n, 16) : Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
        })
        .join(', ')})`
    : '';
}

function intToHex(int: number): string {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string|ColorObject} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {ColorObject} - A color object: {type: string, values: number[]}
 */
export function decomposeColor(color: string | ColorObject): ColorObject {
  // Idempotent
  if ((color as ColorObject).type) {
    return color as ColorObject;
  }

  if ((color as string).charAt(0) === '#') {
    return decomposeColor(hexToRgb(color as string));
  }

  const marker = (color as string).indexOf('(');
  const type = (color as string).substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new JRError(
      'JR: Unsupported `%s` color.\n' +
        'The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().',
      color as string,
    );
  }

  let values = (color as string).substring(marker + 1, (color as string).length - 1);
  let newValues: string[] | number[] = [];
  let colorSpace;

  if (type === 'color') {
    newValues = values.split(' ');
    colorSpace = newValues.shift();

    if (newValues.length === 4 && newValues[3].charAt(0) === '/') {
      newValues[3] = newValues[3].slice(1);
    }
    if (
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(
        colorSpace as string,
      ) === -1
    ) {
      throw new JRError(
        'JR: unsupported `%s` color space.\n' +
          'The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.',
        colorSpace as string,
      );
    }
  } else {
    newValues = values.split(',');
  }
  newValues = newValues.map((value) => parseFloat(value));

  return { type, values: newValues, colorSpace } as ColorObject;
}

/**
 * Returns a channel created from the input color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {string} - The channel for the color, that can be used in rgba or hsla colors
 */
export const colorChannel = (color: string): string => {
  const decomposedColor = decomposeColor(color);
  return decomposedColor.values
    .slice(0, 3)
    .map((val, idx) => (decomposedColor.type.indexOf('hsl') !== -1 && idx !== 0 ? `${val}%` : val))
    .join(' ');
};
export const private_safeColorChannel = (color: string, warning?: string) => {
  try {
    return colorChannel(color);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
};

/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
export function recomposeColor(color: ColorObject): string {
  const { type, colorSpace } = color;
  let { values } = color;
  let newValues: number[] | string[] | string = [];

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    newValues = values.map((n, i) => (i < 3 ? parseInt(n.toString(), 10) : (n as number)));
  } else if (type.indexOf('hsl') !== -1) {
    newValues[1] = `${newValues[1]}%`;
    newValues[2] = `${values[2]}%`;
  }
  if (type.indexOf('color') !== -1) {
    newValues = `${colorSpace} ${newValues.join(' ')}`;
  } else {
    newValues = `${newValues.join(', ')}`;
  }

  return `${type}(${newValues})`;
}

/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */
export function rgbToHex(color: string): string {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color;
  }

  const { values } = decomposeColor(color);
  return `#${values.map((n, i) => intToHex(i === 3 ? Math.round(255 * (n as number)) : (n as number))).join('')}`;
}

/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */
export function hslToRgb(color: string): string {
  const coloObject = decomposeColor(color);
  const { values } = coloObject;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (coloObject.type === 'hsla') {
    type += 'a';
    rgb.push(values[3] as number);
  }

  return recomposeColor({ type, values: rgb } as ColorObject);
}
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color: string): number {
  const colorObject = decomposeColor(color);

  let rgb: [number, number, number] | [number, number, number, number | string] | number[] =
    colorObject.type === 'hsl' || colorObject.type === 'hsla'
      ? decomposeColor(hslToRgb(color)).values
      : colorObject.values;
  rgb = rgb.map((val) => {
    if (colorObject.type !== 'color') {
      (val as number) /= 255; // normalized
    }
    return (val as number) <= 0.03928
      ? (val as number) / 12.92
      : (((val as number) + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
export function getContrastRatio(foreground: string, background: string) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function alpha(color: string, value: number): string {
  let colorObject = decomposeColor(color);
  value = clampWrapper(value);

  if (colorObject.type === 'rgb' || colorObject.type === 'hsl') {
    colorObject.type += 'a';
  }
  if (colorObject.type === 'color') {
    colorObject.values[3] = `/${value}`;
  } else {
    colorObject.values[3] = value;
  }

  return recomposeColor(colorObject);
}

export function private_safeAlpha(color: string, value: number, warning?: string) {
  try {
    return alpha(color, value);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color: string, coefficient: number): string {
  let colorOject = decomposeColor(color);
  coefficient = clampWrapper(coefficient);

  if (colorOject.type.indexOf('hsl') !== -1) {
    colorOject.values[2] *= 1 - coefficient;
  } else if (colorOject.type.indexOf('rgb') !== -1 || colorOject.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      (colorOject.values[i] as number) *= 1 - coefficient;
    }
  }
  return recomposeColor(colorOject);
}

export function private_safeDarken(color: string, coefficient: number, warning?: string) {
  try {
    return darken(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function lighten(color: string, coefficient: number): string {
  let colorOject = decomposeColor(color);
  coefficient = clampWrapper(coefficient);

  if (colorOject.type.indexOf('hsl') !== -1) {
    colorOject.values[2] += (100 - colorOject.values[2]) * coefficient;
  } else if (colorOject.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      (colorOject.values[i] as number) += (255 - (colorOject.values[i] as number)) * coefficient;
    }
  } else if (colorOject.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      (colorOject.values[i] as number) += (1 - (colorOject.values[i] as number)) * coefficient;
    }
  }

  return recomposeColor(colorOject);
}

export function private_safeLighten(color: string, coefficient: number, warning?: string) {
  try {
    return lighten(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function emphasize(color: string, coefficient: number = 0.15): string {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

export function private_safeEmphasize(
  color: string,
  coefficient: number,
  warning?: string,
): string {
  try {
    return emphasize(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 * @param {string} background - CSS color
 * @param {string} overlay - CSS color
 * @param {number} opacity - Opacity multiplier in the range 0 - 1
 * @param {number} [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
 */
export function blend(background: string, overlay: string, opacity: number, gamma: number = 1.0) {
  const blendChannel = (b: number, o: number) =>
    Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);

  const backgroundColor = decomposeColor(background);
  const overlayColor = decomposeColor(overlay);

  const rgb = [
    blendChannel(backgroundColor.values[0], overlayColor.values[0]),
    blendChannel(backgroundColor.values[1], overlayColor.values[1]),
    blendChannel(backgroundColor.values[2], overlayColor.values[2]),
  ];

  return recomposeColor({
    type: 'rgb',
    values: rgb,
  } as ColorObject);
}
