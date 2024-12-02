import _formatJrErrorMessage from '@janribkaui/utils/formatJrErrorMessage';
throw new Error(process.env.NODE_ENV !== 'production' ? 'exists' : _formatJrErrorMessage(1));
throw new Error(
  process.env.NODE_ENV !== 'production' ? 'will be created' : _formatJrErrorMessage(2),
);
