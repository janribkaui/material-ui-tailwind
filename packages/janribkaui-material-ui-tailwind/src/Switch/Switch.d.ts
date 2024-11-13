import * as React from 'react';

import { OverridableStringUnion } from '@janribkaui/types';

import { InternalStandardProps as StandardProps, Theme } from '../';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface SwitchPropsSizeOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchProps
  extends StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon'> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
    SwitchPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', SwitchPropsSizeOverrides>;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: unknown;
}

/**
 *
 * Demos:
 *
 * - [Switch](https://mui.com/material-ui/react-switch/)
 * - [Transfer List](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [Switch API](https://mui.com/material-ui/api/switch/)
 * - inherits [IconButton API](https://mui.com/material-ui/api/icon-button/)
 */
export default function Switch(props: SwitchProps): React.JSX.Element;
