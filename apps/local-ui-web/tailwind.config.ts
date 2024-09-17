import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@repo/shared/**/*.{js,ts,jsx,tsx}',
    './node_modules/@repo/ui/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [],
};

export default config;
