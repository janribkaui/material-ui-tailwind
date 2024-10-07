'use client';
import * as React from 'react';
import { tv } from 'tailwind-variants';
import ButtonBase from '../ButtonBase';
import { mergeStyles } from '../utils';
import resolveProps from '@janribka/utils/resolveProps';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';

// Styles
const commonIconStyleVariants = tv({
  base: ['display-inherit', 'transition-opacity', 'duration-short'],
  variants: {
    size: {
      small: 'text-lg',
      medium: 'text-xl',
      large: 'text-[1.375rem]',
    },
  },
  defaultVariants: { size: 'medium' },
});

const startIconVariants = tv({
  extend: commonIconStyleVariants,
  base: 'mr-2 -ml-1',
  variants: {
    size: {
      small: '-ml-0.5',
    },
  },
});

const endIconVariants = tv({
  extend: commonIconStyleVariants,
  base: '-mr-1 ml-2',
  variants: {
    size: {
      small: '-mr-0.5',
    },
  },
});

const buttonVariants = tv({
  base: [
    'min-w-16',
    'py-1.5',
    'px-4',
    'border-0',
    'rounded',
    'transition-button',
    'duration-short ease-in-out',
    'hover:no-underline decoration-transparent',
    'disabled:text-action-disabled',
  ],

  variants: {
    variant: {
      contained: [
        'shadow-2 hover:shadow-4 hover-none:shadow-2',
        'active:shadow-8 focus-visible:shadow-6',
        'disabled:text-action-disabled disabled:shadow-none disabled:bg-action-disabledBackground',
      ],
      outlined: [
        'py-[0.313rem]',
        'px-[0.938rem]',
        'border',
        'border-current',
        'border-solid',
        'disabled:border-action-disabledBackground',
      ],
      text: ['py-1.5', 'px-2'],
    },
    color: {
      primary: [],
      secondary: [],
      info: [],
      success: [],
      warning: [],
      error: [],
      inherit: [],
    },
    size: {
      small: [],
      large: [],
    },
    disableElevation: {
      true: [
        'shadow-none',
        'hover:shadow-none',
        'active:shadow-none',
        'focus-visible:shadow-none',
        'disabled:shadow-none',
      ],
      false: [],
    },
    fullWidth: {
      true: ['w-full'],
      false: [],
    },
  },
  compoundVariants: [
    // Contained
    {
      variant: 'contained',
      color: 'primary',
      className: 'text-primary-contrastText bg-primary hover:bg-primary-dark',
    },
    {
      variant: 'contained',
      color: 'secondary',
      className: 'text-secondary-contrastText bg-secondary hover:bg-secondary-dark',
    },
    {
      variant: 'contained',
      color: 'success',
      className: 'text-success-contrastText bg-success hover:bg-success-dark',
    },
    {
      variant: 'contained',
      color: 'error',
      className: 'text-error-contrastText bg-error hover:bg-error-dark',
    },
    {
      variant: 'contained',
      color: 'info',
      className: 'text-info-contrastText bg-info hover:bg-info-dark',
    },
    {
      variant: 'contained',
      color: 'warning',
      className: 'text-warning-contrastText bg-warning hover:bg-warning-dark',
    },
    {
      variant: 'contained',
      color: 'inherit',
      className: 'text-inherit bg-inherit hover:bg-inherit',
    },
    // Outlined
    {
      variant: 'outlined',
      color: 'primary',
      className:
        'border-primary/50 hover:border-primary hover:bg-primary/hover dark:hover:bg-primary/hoverDark text-primary',
    },
    {
      variant: 'outlined',
      color: 'secondary',
      className:
        'border-secondary/50 hover:border-secondary hover:bg-secondary/hover dark:hover:bg-secondary/hoverDark text-secondary',
    },
    {
      variant: 'outlined',
      color: 'success',
      className:
        'border-success/50 hover:border-success hover:bg-success/hover dark:hover:bg-success/hoverDark text-success',
    },
    {
      variant: 'outlined',
      color: 'error',
      className:
        'border-error/50 hover:border-error hover:bg-error/hover dark:hover:bg-error/hoverDark text-error',
    },
    {
      variant: 'outlined',
      color: 'info',
      className:
        'border-info/50 hover:border-info hover:bg-info/hover dark:hover:bg-info/hoverDark text-info',
    },
    {
      variant: 'outlined',
      color: 'warning',
      className:
        'border-warning/50 hover:border-warning hover:bg-warning/hover dark:hover:bg-warning/hoverDark text-warning',
    },
    {
      variant: 'outlined',
      color: 'inherit',
      className:
        'border-inherit hover:border-inherit hover:bg-inherit dark:hover:bg-inherit text-inherit',
    },
    // Text
    {
      variant: 'text',
      color: 'primary',
      className: 'text-primary hover:bg-primary/hover dark:hover:bg-primary/hoverDark',
    },
    {
      variant: 'text',
      color: 'secondary',
      className: 'text-secondary hover:bg-secondary/hover dark:hover:bg-secondary/hoverDark',
    },
    {
      variant: 'text',
      color: 'success',
      className: 'text-success hover:bg-success/hover dark:hover:bg-success/hoverDark',
    },
    {
      variant: 'text',
      color: 'error',
      className: 'text-error hover:bg-error/hover dark:hover:bg-error/hoverDark',
    },
    {
      variant: 'text',
      color: 'info',
      className: 'text-info hover:bg-info/hover dark:hover:bg-info/hoverDark',
    },
    {
      variant: 'text',
      color: 'warning',
      className: 'text-warning hover:bg-warning/hover dark:hover:bg-warning/hoverDark',
    },
    {
      variant: 'text',
      color: 'inherit',
      className: 'text-inherit hover:bg-inherit/hover dark:hover:bg-inherit/hoverDark',
    },
    // Small
    {
      size: 'small',
      variant: 'text',
      className: 'py-1 px-[0.313rem] text-[0.813rem]',
    },
    {
      size: 'small',
      variant: 'outlined',
      className: 'py-[0.188rem] px-[0.563rem] text-[0.813rem]',
    },
    {
      size: 'small',
      variant: 'contained',
      className: 'py-1 px-2.5 text-[0.813rem]',
    },
    // Large
    {
      size: 'large',
      variant: 'text',
      className: 'py-2 px-[0.688rem] text-[0.938rem]',
    },
    {
      size: 'large',
      variant: 'outlined',
      className: 'py-[0.438rem] px-[1.313rem] text-[0.938rem]',
    },
    {
      size: 'large',
      variant: 'contained',
      className: 'py-2 px-[1.375rem] text-[0.938rem]',
    },
  ],
});

const Button = React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = React.useContext(ButtonGroupContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'JrButton' });
  const {
    children,
    color = 'primary',
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

  // Icons
  const startIcon = startIconProp && (
    <span className={mergeStyles('JrButton-startIcon', startIconVariants({ size: size }))}>
      {startIconProp}
    </span>
  );

  const endIcon = endIconProp && (
    <span className={mergeStyles('JrButton-endIcon', endIconVariants({ size: size }))}>
      {endIconProp}
    </span>
  );

  return (
    <ButtonBase
      className={mergeStyles(
        'JrButton-root',
        buttonVariants({
          variant: variant,
          color: color,
          size: size,
          disableElevation: disableElevation,
          fullWidth: fullWidth,
        }),
        className,
      )}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={mergeStyles(focusVisibleClassName)}
      ref={ref}
      type={type}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonBase>
  );
});

export default Button;
