import type { Config } from 'tailwindcss';

import basePlugin from '@janribkaui/material-ui-tailwind/styles/basePlugin';
import colorsPlugin from '@janribkaui/material-ui-tailwind/styles/colorsPlugin';
import transitionsPlugin from '@janribkaui/material-ui-tailwind/styles/transitionsPlugin';

// TODO: Dát zde výchozí font roboto podle mui
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  // mode: 'jit',
  theme: {
    extend: {
      transitionProperty: {
        'background-color': 'background-color',
        'box-shadow': 'box-shadow',
        'border-color': 'border-color',
        'border-bottom-color': 'border-bottom-color',
        color: 'color',
        fill: 'fill',
        left: 'left',
        button: 'background-color, color, box-shadow, border-color',
        'stroke-dashoffset': 'stroke-dashoffset',
        'max-width': 'max-width',
      },
      lineHeight: {
        h1: '1.167',
        h2: '1.2',
        h3: '1.167',
        h4: '1.235',
        h5: '1.334',
        h6: '1.6',
        button: '1.75',
      },
      opacity: {
        hover: '0.04',
        selected: '0.08',
        disabled: '0.38',
        focus: '0.12',
        activated: '0.12',
        hoverDark: '0.08',
        selectedDark: '0.16',
        disabledDark: '0.38',
        focusDark: '0.12',
        activatedDark: '0.24',
      },
      flex: {
        noneAuto: '0 0 auto',
      },
      borderRadius: {
        borderRadius: '4',
      },
    },
  },
  plugins: [basePlugin({}), colorsPlugin({}), transitionsPlugin({})],
};

export default config;
