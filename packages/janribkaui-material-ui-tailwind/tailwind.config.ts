import type { Config } from 'tailwindcss';

import basePlugin from '@janribkaui/material-ui-tailwind/styles/basePlugin';
import colorsPlugin from '@janribkaui/material-ui-tailwind/styles/colorsPlugin';
import transitionsPlugin from '@janribkaui/material-ui-tailwind/styles/transitionsPlugin';

// TODO: Dát zde výchozí font roboto podle mui
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // mode: 'jit',
  theme: {
    extend: {
      transitionProperty: {
        'background-color': 'background-color',
        'box-shadow': 'box-shadow',
        'border-color': 'border-color',
        color: 'color',
        button: 'background-color, color, box-shadow, border-color',
        'stroke-dashoffset': 'stroke-dashoffset',
      },
      lineHeight: {
        '4_67': '1.167',
        '4_8': '1.2',
        '4_94': '1.235',
        '5_34': '1.334',
        '6_4': '1.6',
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
    },
  },
  plugins: [basePlugin({}), colorsPlugin({}), transitionsPlugin({})],
};

export default config;
