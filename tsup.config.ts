import { defineConfig } from 'tsup';

export default defineConfig({
  // format: ['cjs', 'esm'],
  format: ['esm'],
  dts: true,
  minify: false,
  splitting: false,
  outDir: 'build',
  target: 'esnext',
  skipNodeModulesBundle: true,
  bundle: false,
  clean: true,
  treeshake: true,
  external: [
    'react', // Označení 'react' jako externí
    'react-dom', // Označení 'react-dom' jako externí
    'clsx', // Označení 'clsx' jako externí
    /^@janribka\//, // Označení všech balíčků začínajících na '@janribka/' jako externí
    /node_modules/, // Označení všech balíčků z node_modules jako externí
    /\.d\.ts$/, // Vyloučí všechny .d.ts soubory
  ],
  esbuildOptions(options) {
    options.legalComments = 'inline';
  },
});
