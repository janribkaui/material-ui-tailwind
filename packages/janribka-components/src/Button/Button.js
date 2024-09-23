'use client';
import * as React from 'react';
import { tv } from 'tailwind-variants';
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
import { mergeStyles } from '../utils';
import plugin from 'tailwindcss/plugin';
import { inherits } from 'util';
import { color } from '@janribka/system';
// import tailwindConfig from '../tailwind.config';
// import resolveConfig from 'tailwindcss/resolveConfig';

// const fullConfig = React.useMemo(resolveConfig(tailwindConfig), []);

// Styles
const commonIconStyleVariants = tv({
  base: 'display-inherit',
  variants: {
    size: {
      small: 'text-lg',
      medium: 'text-xl',
      large: 'text-[1.375rem]',
    },
  },
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

const buttonVariants = tv({
  base: [
    'min-w-16',
    'py-1.5',
    'px-4',
    'border-0',
    'rounded-sm',
    'transition-button',
    'duration-short ease-in-out',
    'hover:no-underline decoration-transparent',
    'disabled:text-action-disabled',
  ],

  variants: {
    variant: {
      contained: [
        'shadow-sm hover:shadow hover-none:shadow-sm',
        'active:shadow-lg focus-visible:shadow-md',
        'disabled:text-action-disabled disabled:shadow-none disabled:text-action-disabledBackground',
      ],
      outlined: [
        // 'py-1',
        // 'px-3',
        // 'border',
        // 'border-current',
        // 'bg-transparent',
        // 'text-current',
        // 'disabled:border-action-disabled',
      ],
      text: [
        // 'py-1.5', 'px-2', 'bg-transparent', 'text-current'
      ],
    },
    color: {
      primary: [
        // 'text-primary-contrastText',
        // 'bg-primary-main',
        // 'hover:bg-primary-dark',
        // 'active:bg-primary-darker',
        // 'focus-visible:bg-primary-dark',
        // 'disabled:bg-primary-disabled',
      ],
      secondary: [
        // 'text-secondary-contrastText',
        // 'bg-secondary-main',
        // 'hover:bg-secondary-dark',
        // 'active:bg-secondary-darker',
        // 'focus-visible:bg-secondary-dark',
        // 'disabled:bg-secondary-disabled',
      ],
      info: [
        // 'text-info-contrastText',
        // 'bg-info-main',
        // 'hover:bg-info-dark',
        // 'active:bg-info-darker',
        // 'focus-visible:bg-info-dark',
        // 'disabled:bg-info-disabled',
      ],
      success: [
        // 'text-success-contrastText',
        // 'bg-success-main',
        // 'hover:bg-success-dark',
        // 'active:bg-success-darker',
        // 'focus-visible:bg-success-dark',
        // 'disabled:bg-success-disabled',
      ],
      warning: [
        // 'text-warning-contrastText',
        // 'bg-warning-main',
        // 'hover:bg-warning-dark',
        // 'active:bg-warning-darker',
        // 'focus-visible:bg-warning-dark',
        // 'disabled:bg-warning-disabled',
      ],
      error: [
        // 'text-error-contrastText',
        // 'bg-error-main',
        // 'hover:bg-error-dark',
        // 'active:bg-error-darker',
        // 'focus-visible:bg-error-dark',
        // 'disabled:bg-error-disabled',
      ],
      inherit: [],
    },
  },
  compoundVariants: [
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
      // TODO: Doplnit do tailwind a nastavit dole
      // text-inherit	color: inherit;
      // Aa
      // text-current	color: currentColor;
      // Aa
      // text-transparent

      variant: 'contained',
      color: 'inherit',
      className: 'text-primary-contrastText bg-primary hover:bg-primary-dark',
    },
  ],
  defaultVariants: { variant: 'text', size: 'medium' },
});

const Button = React.forwardRef(function Button(props, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  // const resolvedProps = resolveProps(contextProps, inProps);
  // const props = useDefaultProps({ props: resolvedProps, name: 'JRButton' });
  const {
    children,
    color = 'primary',
    // component = 'button',
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size,
    startIcon: startIconProp,
    type,
    variant,
    ...other
  } = props;
  const contextProps = React.useContext(ButtonGroupContext);

  // Class names
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const positionClassName = buttonGroupButtonContextPositionClassName || '';

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
  console.log(props);

  // TODO: Tady bude memo funkce, kter8 bude na48tat colors a bude nastavovat css prom2nn0 pro variants

  return (
    <ButtonBase
      // ownerState={ownerState}
      className={mergeStyles(
        'JrButton-root text-inherit',
        buttonVariants({ color: props.color, variant: props.variant }),
        contextProps.className,
        className,
        positionClassName,
      )}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={mergeStyles(focusVisibleClassName)}
      ref={ref}
      type={type}
      {...other}
      // classes={classes}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonBase>
  );
});

export default Button;
