import { defineConfig } from 'tsup';

import configBase from '../../tsup.config';

export default defineConfig({
  ...configBase,
  entryPoints: ['src/index.ts', 'src/**/index.ts'],
});
