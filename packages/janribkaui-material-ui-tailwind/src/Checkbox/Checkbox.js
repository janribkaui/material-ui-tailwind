'use client';
import * as React from 'react';
import clsx from 'clsx';
import { alpha } from '@mui/system/colorManipulator';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import capitalize from '../utils/capitalize';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import checkboxClasses from './checkboxClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

import { useDefaultProps } from '../DefaultPropsProvider';

const CheckboxRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.indeterminate && styles.indeterminate,
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    variants: [
      {
        props: { color: 'default', disableRipple: false },
        style: {
          '&:hover': {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(([, palette]) => palette && palette.main)
        .map(([color]) => ({
          props: { color, disableRipple: false },
          style: {
            '&:hover': {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
            },
          },
        })),
      ...Object.entries(theme.palette)
        .filter(([, palette]) => palette && palette.main)
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
              color: (theme.vars || theme).palette[color].main,
            },
            [`&.${checkboxClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
            },
          },
        })),
      {
        // Should be last to override other colors
        props: { disableRipple: false },
        style: {
          // Reset on touch devices, it doesn't add specificity
          '&:hover': {
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    ],
  })),
);

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
        fontSize: icon.props.fontSize ?? size,
      })}
      checkedIcon={React.cloneElement(indeterminateIcon, {
        fontSize: indeterminateIcon.props.fontSize ?? size,
      })}
      ownerState={ownerState}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
      classes={classes}
    />
  );
});

export default Checkbox;
