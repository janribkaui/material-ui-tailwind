import deepmerge from '@janribkaui/utils/deepmerge';

function merge(acc, item) {
  if (!item) {
    return acc;
  }

  return deepmerge(acc, item, {
    clone: false, // No need to clone deep, it's way faster.
  });
}

export default merge;
