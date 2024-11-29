const path = require('path');

// WARNING: Use this module only as an inspiration.
// Cherry-pick the parts you need and inline them in the webpack.config you need.
// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos and by eslint-plugin-import.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '@janribkaui/internal-markdown': path.resolve(__dirname, './packages/markdown'),
      '@janribkaui/material-ui-tailwind': path.resolve(
        __dirname,
        './packages/janribkaui-material-ui-tailwind/src',
      ),
      '@janribkaui/lab': path.resolve(__dirname, './packages/janribkaui-lab/src'),
      '@janribkaui/private-theming': path.resolve(
        __dirname,
        './packages/janribkaui-private-theming/src',
      ),
      '@janribkaui/styled-engine': path.resolve(
        __dirname,
        './packages/janribkaui-styled-engine/src',
      ),
      '@janribkaui/system': path.resolve(__dirname, './packages/janribkaui-system/src'),
      '@janribkaui/utils': path.resolve(__dirname, './packages/janribkaui-utils/src'),
      '@janribkaui/internal-docs-utils': path.resolve(
        __dirname,
        './packages-internal/docs-utils/src',
      ),
      '@janribkaui/internal-scripts/typescript-to-proptypes': path.resolve(
        __dirname,
        './packages-internal/scripts/typescript-to-proptypes/src',
      ),
      '@janribkaui/internal-test-utils': path.resolve(
        __dirname,
        './packages-internal/test-utils/src',
      ),
      docs: path.resolve(__dirname, './docs'),
    },
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
};
