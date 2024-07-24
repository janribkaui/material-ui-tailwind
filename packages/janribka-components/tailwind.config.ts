import type { Config } from 'tailwindcss';
// import {} from '@janribka/styles/';

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // presets: [sharedConfig],
};

export default config;
