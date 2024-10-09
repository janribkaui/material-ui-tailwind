'use client';

import ClassNameGenerator from '@janribkaui/utils/ClassNameGenerator';
import createBox from '../createBox';
import boxClasses from './boxClasses';

const Box = createBox({
  defaultClassName: boxClasses.root,
  generateClassName: ClassNameGenerator.generate,
});

export default Box;
