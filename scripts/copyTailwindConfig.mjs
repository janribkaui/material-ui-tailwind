/* eslint-disable no-console */
import { includeFileInBuild } from './copyFilesUtils.mjs';

const packagePath = process.cwd();

async function run() {
  try {
    await Promise.all(
      ['./tailwind.config.ts'].map(async (file) => {
        const [sourcePath, targetPath] = file.split(':');
        await includeFileInBuild(sourcePath, targetPath);
      }),
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
