import type { Config } from 'tailwindcss';

// import twConfigBase from '@janribka/ui/tailwind.config';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@janribkaui/material-ui-tailwind/**/*.{js,ts,jsx,tsx}',
  ],
  // presets: [twConfigBase],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ff0000',
          DEFAULT: '#aa0000',
          dark: '#550000',
        },
      },
    },
  },
};

export default config;
