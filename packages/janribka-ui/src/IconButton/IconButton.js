'use client';
import * as React from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
// import chainPropTypes from '@mui/utils/chainPropTypes';
// import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@janribka/system/colorManipulator';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
// import iconButtonClasses, { getIconButtonUtilityClass } from './iconButtonClasses';
import { tv } from 'tailwind-variants';

// const useUtilityClasses = (ownerState) => {
//   const { classes, disabled, color, edge, size } = ownerState;

//   const slots = {
//     root: [
//       'root',
//       disabled && 'disabled',
//       color !== 'default' && `color${capitalize(color)}`,
//       edge && `edge${capitalize(edge)}`,
//       `size${capitalize(size)}`,
//     ],
//   };

//   return composeClasses(slots, getIconButtonUtilityClass, classes);
// };

const iconButtonVariants = tv({
  base: 'text-center',
  variants: {},
});

const IconButtonRoot = styled(ButtonBase, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    padding: 8,
    borderRadius: '50%',
    color: (theme.vars || theme).palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: { disableRipple: false },
        style: {
          '&:hover': {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      {
        props: { edge: 'start' },
        style: {
          marginLeft: -12,
        },
      },
      {
        props: { edge: 'start', size: 'small' },
        style: {
          marginLeft: -3,
        },
      },
      {
        props: { edge: 'end' },
        style: {
          marginRight: -12,
        },
      },
      {
        props: { edge: 'end', size: 'small' },
        style: {
          marginRight: -3,
        },
      },
    ],
  })),
  memoTheme(({ theme }) => ({
    variants: [
      {
        props: { color: 'inherit' },
        style: {
          color: 'inherit',
        },
      },
      ...Object.entries(theme.palette)
        .filter(([, value]) => value && value.main) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color },
          style: {
            color: (theme.vars || theme).palette[color].main,
          },
        })),
      ...Object.entries(theme.palette)
        .filter(([, value]) => value && value.main) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color, disableRipple: false },
          style: {
            '&:hover': {
              backgroundColor: theme.vars
                ? `rgba(${(theme.vars || theme).palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                : alpha(
                    (theme.vars || theme).palette[color].main,
                    theme.palette.action.hoverOpacity,
                  ),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
          },
        })),
      {
        props: { size: 'small' },
        style: {
          padding: 5,
          fontSize: theme.typography.pxToRem(18),
        },
      },
      {
        props: { size: 'large' },
        style: {
          padding: 12,
          fontSize: theme.typography.pxToRem(28),
        },
      },
    ],
    [`&.${iconButtonClasses.disabled}`]: {
      backgroundColor: 'transparent',
      color: (theme.vars || theme).palette.action.disabled,
    },
  })),
);

/**
 * Refer to the [Icons](/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = React.forwardRef(function IconButton(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiIconButton' });
  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    disableRipple = false,
    size = 'medium',
    ...other
  } = props;

  const ownerState = {
    ...props,
    edge,
    color,
    disabled,
    disableFocusRipple,
    disableRipple,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <IconButtonRoot
      className={clsx(classes.root, className, 'flex')}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      disableRipple={disableRipple}
      ref={ref}
      {...other}
      ownerState={ownerState}
    >
      {children}
    </IconButtonRoot>
  );
});

export default IconButton;
