import * as React from 'react';

import { OverridableStringUnion } from '@janribkaui/types';

import { InternalStandardProps as StandardProps } from '../';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface CheckboxPropsSizeOverrides {}

export interface CheckboxPropsColorOverrides {}

export interface CheckboxProps
  extends StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon' | 'type'> {
  /**
   * If `true`, the component is checked.
   */
  checked?: SwitchBaseProps['checked'];
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
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
    CheckboxPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: SwitchBaseProps['disabled'];
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: SwitchBaseProps['disableRipple'];
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon?: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: SwitchBaseProps['id'];
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon?: React.ReactNode;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: SwitchBaseProps['inputProps'];
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: SwitchBaseProps['onChange'];
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required?: SwitchBaseProps['required'];
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', CheckboxPropsSizeOverrides>;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: SwitchBaseProps['value'];
}

/**
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Transfer List](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [Checkbox API](https://mui.com/material-ui/api/checkbox/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
export default function Checkbox(props: CheckboxProps): React.JSX.Element;
