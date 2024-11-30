import _formatJrErrorMessage from '@janribkaui/utils/formatJrErrorMessage';
const foo = 'foo';
const bar = 'bar';
throw new Error(
  process.env.NODE_ENV !== 'production' ? `JR: ${foo}, ${bar}` : _formatJrErrorMessage(1, foo, bar),
);
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? `JR: ${foo}` + `, ${bar}`
    : _formatJrErrorMessage(1, foo, bar),
);
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? 'JR: ' + `${foo}, ${bar}`
    : _formatJrErrorMessage(1, foo, bar),
);
