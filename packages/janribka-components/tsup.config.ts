import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/**/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  minify: false,
  splitting: true,
  outDir: 'build',
});
