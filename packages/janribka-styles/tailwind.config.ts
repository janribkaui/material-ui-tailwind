import type { Config } from 'tailwindcss';
// import radixThemePlugin from "./appTheme";

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content' | 'presets'> = {
  theme: {
    extend: {
      transitionProperty: {
        'background-image': 'background-image',
        opacity: 'opacity',
        'background-color': 'background-color',
        all: 'all',
      },
      maxWidth: {
        main: '1140px',
      },
      boxShadow: {
        dialog:
          'hsl(206 22% 7% / 35%) 0px 10px 38px -10px,hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
      },
      backgroundSize: {
        '70': '70%',
      },
    },
  },
  plugins: [
    // radixThemePlugin({
    //   useTailwindColorNames: true,
    //   useTailwindRadiusNames: true,
    //   mapMissingTailwindColors: true,
    // }),
  ],
};
export default config;
