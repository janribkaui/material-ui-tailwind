import * as React from 'react';

import { OverridableStringUnion } from '@janribkaui/types';

import { InternalStandardProps as StandardProps, Theme } from '../';

export interface LinearProgressPropsColorOverrides {}

export interface LinearProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
    LinearProgressPropsColorOverrides
  >;
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value?: number;
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer?: number;
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 *
 * Demos:
 *
 * - [Progress](https://mui.com/material-ui/react-progress/)
 *
 * API:
 *
 * - [LinearProgress API](https://mui.com/material-ui/api/linear-progress/)
 */
export default function LinearProgress(props: LinearProgressProps): React.JSX.Element;
