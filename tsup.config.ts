import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  dts: true,
  minify: false,
  splitting: false,
  outDir: 'build',
  external: (id) => {
    // Označte všechny balíčky z node_modules jako externí
    if (id.includes('node_modules')) {
      // Vynechejte balíčky z projektu @janribka/...
      if (id.startsWith('@janribka/')) {
        return false;
      }
      return true;
    }
    return false;
  },
  // external: ['react', 'node_modules'],
});
