import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/**/index.ts'],
  format: ['cjs'],
  dts: true,
  minify: false,
  splitting: false,
  outDir: 'build',
  external: ['react'],
});
