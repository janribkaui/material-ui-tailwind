import type { Config } from 'tailwindcss';
import twConfigBase from '@janribka/components/tailwind.config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@janribka/components/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [twConfigBase],
};

export default config;
