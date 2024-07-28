import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  minify: false,
  splitting: false,
  outDir: 'build',
  external: ['react', '@janribka/types'],
});
