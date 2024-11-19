import type { Config } from 'tailwindcss';
import { blue } from '@janribkaui/material-ui-tailwind/colors';
import { getContrastText } from '@janribkaui/material-ui-tailwind/styles';
import twConfigBase from '@janribkaui/material-ui-tailwind/tailwind.config';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@janribkaui/material-ui-tailwind/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [twConfigBase],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'rgb(254, 205, 210)',
          DEFAULT: 'rgb(253, 126, 143)',
          dark: 'rgb(227, 113, 128)',
          contrastText: getContrastText('rgb(253, 126, 143)'),
        },
        blue,
      },
    },
  },
};

export default config;
