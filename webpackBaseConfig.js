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
      '@janribkaui/material-ui-tailwind': path.resolve(
        __dirname,
        './packages/janribkaui-material-ui-tailwind/src',
      ),
      '@janribkaui/private-theming': path.resolve(
        __dirname,
        './packages/janribkaui-private-theming/src',
      ),
      '@janribkaui/styled-engine': path.resolve(__dirname, './packages/janribkaui-styled-engine/src'),
      '@janribkaui/system': path.resolve(__dirname, './packages/janribkaui-system/src'),
      '@janribkaui/utils': path.resolve(__dirname, './packages/janribkaui-utils/src'),
      docs: path.resolve(__dirname, './docs'),
    },
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
};
