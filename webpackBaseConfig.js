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
      '@janribka/ui': path.resolve(__dirname, './packages/janribka-ui/src'),
      '@janribka/private-theming': path.resolve(
        __dirname,
        './packages/janribka-private-theming/src',
      ),
      '@janribka/styled-engine': path.resolve(__dirname, './packages/janribka-styled-engine/src'),
      '@janribka/system': path.resolve(__dirname, './packages/janribka-system/src'),
      '@janribka/utils': path.resolve(__dirname, './packages/janribka-utils/src'),
      docs: path.resolve(__dirname, './docs'),
    },
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
};
