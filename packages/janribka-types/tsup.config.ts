import { defineConfig } from 'tsup';

import configBase from '../../tsup.config';

export default defineConfig({
  ...configBase,
  entryPoints: ['index.ts'],
  // external: ['react', '@janribka/types'],
});
