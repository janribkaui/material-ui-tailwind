import _formatJrErrorMessage from '@janribkaui/utils/formatJrErrorMessage';
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? 'JR: Expected valid input target.\n' + 'Did you use `inputComponent`'
    : _formatJrErrorMessage(1),
);
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? `JR: Expected valid input target.\n` + `Did you use \`inputComponent\``
    : _formatJrErrorMessage(1),
);
