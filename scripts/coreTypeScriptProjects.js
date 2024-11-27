import path from 'path';

export default {
  'material-ui-tailwind': {
    rootPath: path.join(process.cwd(), 'packages/janribkaui-material-ui-tailwind'),
    entryPointPath: 'src/index.d.ts',
  },
  // lab: {
  //   rootPath: path.join(process.cwd(), 'packages/janribkaui-lab'),
  //   entryPointPath: 'src/index.d.ts',
  // },
  // system: {
  //   rootPath: path.join(process.cwd(), 'packages/janribkaui-system'),
  //   entryPointPath: 'src/index.d.ts',
  // },
  // docs: {
  //   rootPath: path.join(process.cwd(), 'docs'),
  //   tsConfigPath: 'tsconfig.json',
  // },
};
