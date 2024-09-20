import { tv } from 'tailwind-variants';
import resolveConfig from 'tailwindcss/resolveConfig';

import Button from '@janribka/components/Button';

import tailwindConfig from '../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

// document.documentElement.style.setProperty('--variant-textColor', 'green');
const xxx = (value) => {
  return Object.entries([value])
    .filter(([, color]) => color)
    .map(([color]) => {
      document.documentElement.style.setProperty(
        '--variant-textColor',

        fullConfig.theme.colors[value].DEFAULT,
      );

      return { [color]: '' };
    });
};

const commonIconStyleVariants = tv({
  base: 'text-[var(--variant-textColor)]',
  variants: {
    // size: {
    //   small: 'text-lg',
    //   medium: 'text-xl',
    //   large: 'text-[22px]',
    //   x: {
    //     style: {
    //       '& > *:nth-of-type(1)': {
    //         fontSize: 18,
    //       },
    //     },
    //   },
    // },
    color: (color) => {
      return xxx(color);
    },
  },
});

const colorVariants = commonIconStyleVariants.variants.color('secondary');
console.log('Color Variants:', colorVariants);

function App() {
  return (
    <>
      <h1 className={commonIconStyleVariants({ color: 'primary', size: 'small' })}>kkjj</h1>
      <h2>kkjj</h2>
      <h3>kkjj</h3>
      <h4>kkjj</h4>
      <h5>kkjj</h5>
      <h6>kkjj</h6>
      <Button variant="outlined" color="info">
        Button
      </Button>
    </>
  );
}

export default App;
