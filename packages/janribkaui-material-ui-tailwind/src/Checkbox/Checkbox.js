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

export default Checkbox;
