'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';

import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStyles } from '../utils';
import { svgIconRootVariants } from '../SvgIcon/SvgIcon';

const CheckboxRoot = styled(SwitchBase)`
  &.disable-ripple {
    // Reset on touch devices, it doesn't add specificity
    &:hover {
      @media (hover: none) {
        background-color: transparent;
      },
    },
  }
`;

const checkboxRootVariants = tv({
  base: [
    'text-text-secondary',
    'hover:bg-action-active/hover',
    'has-[input:disabled]:text-action-disabled',
  ],
  variants: {
    color: {
      primary: [],
      secondary: [],
      error: [],
      info: [],
      success: [],
      warning: [],
      default: [],
    },
    disableRipple: {
      true: ['disable-ripple'],
      false: [],
    },
    indeterminate: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    // Colors
    { color: 'primary', disableRipple: false, className: ['hover:bg-primary/hover'] },
    { color: 'secondary', disableRipple: false, className: ['hover:bg-secondary/hover'] },
    { color: 'error', disableRipple: false, className: ['hover:bg-error/hover'] },
    { color: 'info', disableRipple: false, className: ['hover:bg-info/hover'] },
    { color: 'success', disableRipple: false, className: ['hover:bg-success/hover'] },
    { color: 'warning', disableRipple: false, className: ['hover:bg-warning/hover'] },
    { color: 'default', disableRipple: false, className: ['hover:bg-action-active/hover'] },
    // Checked
    { color: 'primary', className: ['has-[input:checked]:text-primary'] },
    { color: 'secondary', className: ['has-[input:checked]:text-secondary'] },
    { color: 'error', className: ['has-[input:checked]:text-error'] },
    { color: 'info', className: ['has-[input:checked]:text-info'] },
    { color: 'success', className: ['has-[input:checked]:text-success'] },
    { color: 'warning', className: ['has-[input:checked]:text-warning'] },
    { color: 'default', className: ['has-[input:checked]:text-action-active'] },
    // indeterminate
    { indeterminate: true, color: 'primary', className: ['text-primary'] },
    { indeterminate: true, color: 'secondary', className: ['text-secondary'] },
    { indeterminate: true, color: 'error', className: ['text-error'] },
    { indeterminate: true, color: 'info', className: ['text-info'] },
    { indeterminate: true, color: 'success', className: ['text-success'] },
    { indeterminate: true, color: 'warning', className: ['text-warning'] },
    { indeterminate: true, color: 'default', className: ['text-action-active'] },
  ],
});

const defaultCheckedIcon = <CheckBoxIcon />;
const defaultIcon = <CheckBoxOutlineBlankIcon />;
const defaultIndeterminateIcon = <IndeterminateCheckBoxIcon />;

const Checkbox = React.forwardRef(function Checkbox(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrCheckbox' });
  const {
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = 'medium',
    disableRipple = false,
    className,
    ...other
  } = props;

  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;

  return (
    <CheckboxRoot
      type="checkbox"
      inputProps={{
        'data-indeterminate': indeterminate,
        ...inputProps,
      }}
      icon={React.cloneElement(icon, {
        className: mergeStyles(
          svgIconRootVariants({ hasSvgAsChild: false, fontSize: size, color: color }),
          icon.className,
        ),
        fontSize: icon.props.fontSize ?? size,
      })}
      checkedIcon={React.cloneElement(indeterminateIcon, {
        className: mergeStyles(
          svgIconRootVariants({ hasSvgAsChild: false, fontSize: size, color: color }),
          indeterminateIcon.className,
        ),
        fontSize: indeterminateIcon.props.fontSize ?? size,
      })}
      ref={ref}
      className={mergeStyles(
        'JrCheckbox-root',
        checkboxRootVariants({
          color: color,
          disableRipple: disableRipple,
          indeterminate: indeterminate,
        }),
        className,
      )}
      {...other}
    />
  );
});

Checkbox.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOf([
    'default',
    'error',
    'info',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: PropTypes.node,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: PropTypes.node,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Checkbox;
