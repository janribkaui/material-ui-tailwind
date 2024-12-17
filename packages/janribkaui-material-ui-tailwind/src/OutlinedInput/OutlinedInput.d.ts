import * as React from 'react';

import { InternalStandardProps as StandardProps, Theme } from '../';
import { InputBaseProps } from '../InputBase';

export interface OutlinedInputProps extends StandardProps<InputBaseProps> {
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched?: boolean;
}

/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [OutlinedInput API](https://mui.com/material-ui/api/outlined-input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 */
declare const OutlinedInput: ((props: OutlinedInputProps) => React.JSX.Element) & {
  jrName: string;
};

export default OutlinedInput;
