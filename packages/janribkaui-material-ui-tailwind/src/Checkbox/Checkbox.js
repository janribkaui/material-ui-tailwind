'use client';
import * as React from 'react';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';

import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStyles } from '../utils';

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
  base: ['text-text-secondary', 'hover:bg-action-active/hover'],
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
    disabled: {
      true: ['text-action-disabled'],
      false: [],
    },
    checked: {
      true: [],
      false: [],
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
    { checked: true, color: 'primary', className: ['hover:bg-primary'] },
    { checked: true, color: 'secondary', className: ['hover:bg-secondary'] },
    { checked: true, color: 'error', className: ['hover:bg-error'] },
    { checked: true, color: 'info', className: ['hover:bg-info'] },
    { checked: true, color: 'success', className: ['hover:bg-success'] },
    { checked: true, color: 'warning', className: ['hover:bg-warning'] },
    { checked: true, color: 'default', className: ['hover:bg-action-active'] },
    // indeterminate
    { indeterminate: true, color: 'primary', className: ['hover:bg-primary'] },
    { indeterminate: true, color: 'secondary', className: ['hover:bg-secondary'] },
    { indeterminate: true, color: 'error', className: ['hover:bg-error'] },
    { indeterminate: true, color: 'info', className: ['hover:bg-info'] },
    { indeterminate: true, color: 'success', className: ['hover:bg-success'] },
    { indeterminate: true, color: 'warning', className: ['hover:bg-warning'] },
    { indeterminate: true, color: 'default', className: ['hover:bg-action-active'] },
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
    disabled = false,
    checked,
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
        fontSize: icon.props.fontSize ?? size,
      })}
      checkedIcon={React.cloneElement(indeterminateIcon, {
        fontSize: indeterminateIcon.props.fontSize ?? size,
      })}
      ref={ref}
      className={mergeStyles(
        'JrCheckbox-root',
        checkboxRootVariants({ color, disabled, checked, disableRipple, indeterminate }),
      )}
      {...other}
    />
  );
});

export default Checkbox;
