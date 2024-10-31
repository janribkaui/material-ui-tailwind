import * as React from 'react';

import { InternalStandardProps as StandardProps } from '../';

export interface FormGroupProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row?: boolean;
}

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Switch](https://mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormGroup API](https://mui.com/material-ui/api/form-group/)
 */
export default function FormGroup(props: FormGroupProps): React.JSX.Element;
