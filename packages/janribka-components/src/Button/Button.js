'use client';
import * as React from 'react';
import clsx from 'clsx';
import resolveProps from '@janribka/utils/resolveProps';
import composeClasses from '@janribka/utils/composeClasses';
import { alpha } from '@janribka/system/colorManipulator';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import ButtonGroupButtonContext from '../ButtonGroup/ButtonGroupButtonContext';

const useUtilityClasses = (ownerState) => {
  const { color, disableElevation, fullWidth, size, variant, classes } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      `${variant}${capitalize(color)}`,
      `size${capitalize(size)}`,
      `${variant}Size${capitalize(size)}`,
      `color${capitalize(color)}`,
      disableElevation && 'disableElevation',
      fullWidth && 'fullWidth',
    ],
    label: ['label'],
    startIcon: ['icon', 'startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['icon', 'endIcon', `iconSize${capitalize(size)}`],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

const commonIconStyles = [
  {
    props: { size: 'small' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 18,
      },
    },
  },
  {
    props: { size: 'medium' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 20,
      },
    },
  },
  {
    props: { size: 'large' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 22,
      },
    },
  },
];

const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'JRButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`${ownerState.variant}${capitalize(ownerState.color)}`],
      styles[`size${capitalize(ownerState.size)}`],
      styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`],
      ownerState.color === 'inherit' && styles.colorInherit,
      ownerState.disableElevation && styles.disableElevation,
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})(
  memoTheme(({ theme }) => {
    const inheritContainedBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];

    const inheritContainedHoverBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
    return {
      ...theme.typography.button,
      minWidth: 64,
      padding: '6px 16px',
      border: 0,
      borderRadius: (theme.vars || theme).shape.borderRadius,
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'border-color', 'color'],
        {
          duration: theme.transitions.duration.short,
        },
      ),
      '&:hover': {
        textDecoration: 'none',
      },
      [`&.${buttonClasses.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled,
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: `var(--variant-containedColor)`,
            backgroundColor: `var(--variant-containedBg)`,
            boxShadow: (theme.vars || theme).shadows[2],
            '&:hover': {
              boxShadow: (theme.vars || theme).shadows[4],
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow: (theme.vars || theme).shadows[2],
              },
            },
            '&:active': {
              boxShadow: (theme.vars || theme).shadows[8],
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: (theme.vars || theme).shadows[6],
            },
            [`&.${buttonClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
              boxShadow: (theme.vars || theme).shadows[0],
              backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            padding: '5px 15px',
            border: '1px solid currentColor',
            borderColor: `var(--variant-outlinedBorder, currentColor)`,
            backgroundColor: `var(--variant-outlinedBg)`,
            color: `var(--variant-outlinedColor)`,
            [`&.${buttonClasses.disabled}`]: {
              border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            padding: '6px 8px',
            color: `var(--variant-textColor)`,
            backgroundColor: `var(--variant-textBg)`,
          },
        },
        ...Object.entries(theme.palette)
          .filter(([, palette]) => palette && palette.main && palette.dark && palette.contrastText)
          .map(([color]) => ({
            props: { color },
            style: {
              '--variant-textColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedBorder': theme.vars
                ? `rgba(${theme.vars.palette[color].mainChannel} / 0.5)`
                : alpha(theme.palette[color].main, 0.5),
              '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
              '--variant-containedBg': (theme.vars || theme).palette[color].main,
              '@media (hover: hover)': {
                '&:hover': {
                  '--variant-containedBg': (theme.vars || theme).palette[color].dark,
                  '--variant-textBg': theme.vars
                    ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                    : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                  '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
                  '--variant-outlinedBg': theme.vars
                    ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                    : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                },
              },
            },
          })),
        {
          props: {
            color: 'inherit',
          },
          style: {
            '--variant-containedColor': theme.vars
              ? // this is safe because grey does not change between default light/dark mode
                theme.vars.palette.text.primary
              : theme.palette.getContrastText?.(inheritContainedBackgroundColor),
            '--variant-containedBg': theme.vars
              ? theme.vars.palette.Button.inheritContainedBg
              : inheritContainedBackgroundColor,
            '@media (hover: hover)': {
              '&:hover': {
                '--variant-containedBg': theme.vars
                  ? theme.vars.palette.Button.inheritContainedHoverBg
                  : inheritContainedHoverBackgroundColor,
                '--variant-textBg': theme.vars
                  ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
                '--variant-outlinedBg': theme.vars
                  ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
              },
            },
          },
        },
        {
          props: {
            size: 'small',
            variant: 'text',
          },
          style: {
            padding: '4px 5px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'text',
          },
          style: {
            padding: '8px 11px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'outlined',
          },
          style: {
            padding: '3px 9px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'outlined',
          },
          style: {
            padding: '7px 21px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'contained',
          },
          style: {
            padding: '4px 10px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'contained',
          },
          style: {
            padding: '8px 22px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            disableElevation: true,
          },
          style: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.disabled}`]: {
              boxShadow: 'none',
            },
          },
        },
        {
          props: { fullWidth: true },
          style: { width: '100%' },
        },
      ],
    };
  }),
);

const ButtonStartIcon = styled('span', {
  name: 'JRButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
  variants: [
    {
      props: { size: 'small' },
      style: {
        marginLeft: -2,
      },
    },
    ...commonIconStyles,
  ],
});

const ButtonEndIcon = styled('span', {
  name: 'JRButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
  variants: [
    {
      props: { size: 'small' },
      style: {
        marginRight: -2,
      },
    },
    ...commonIconStyles,
  ],
});

const Button = React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = React.useContext(ButtonGroupContext);
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'JRButton' });
  const {
    children,
    color = 'primary',
    component = 'button',
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const startIcon = startIconProp && (
    <ButtonStartIcon className={classes.startIcon} ownerState={ownerState}>
      {startIconProp}
    </ButtonStartIcon>
  );

  const endIcon = endIconProp && (
    <ButtonEndIcon className={classes.endIcon} ownerState={ownerState}>
      {endIconProp}
    </ButtonEndIcon>
  );

  const positionClassName = buttonGroupButtonContextPositionClassName || '';

  return (
    <ButtonRoot
      ownerState={ownerState}
      className={clsx(contextProps.className, classes.root, className, positionClassName)}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      type={type}
      {...other}
      classes={classes}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonRoot>
  );
});

export default Button;
