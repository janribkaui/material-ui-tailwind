'use client';
import * as React from 'react';
import ButtonBase from '../ButtonBase';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const iconButtonVariants = tv({
  base: [
    'text-center',
    'flex-noneAuto',
    'text-2xl',
    'p-2',
    'rounded-[50%]',
    'transition-background-color',
    'duration-shortest',
    'disabled:bg-transparent',
    'disabled:text-action-disabled',
  ],
  variants: {
    disableRipple: {
      true: '',
      false: ['hover:bg-action-active/hover', 'hover:hover-none:bg-transparent'],
    },
    edge: { start: '-ml-3', end: '-mr-3' },
    size: {
      small: ['p-[0.313rem]', 'text-lg'],
      large: ['p-3', 'text-[1.75rem]'],
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      inherit: 'text-inherit',
    },
  },
  compoundVariants: [
    { size: 'small', edge: 'start', className: '-ml-[0.188rem]' },
    { size: 'small', edge: 'end', className: '-mr-[0.188rem]' },
    {
      disableRipple: false,
      color: 'primary',
      className: ['hover:bg-primary-main/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'primary',
      className: ['hover:bg-primary-main/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'secondary',
      className: ['hover:bg-secondary-main/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'info',
      className: ['hover:bg-info-main/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'success',
      className: ['hover:bg-success-main/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'error',
      className: ['hover:bg-error-main/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'inherit',
      className: ['hover:bg-inherit-main/hover', 'hover:hover-none:bg-transparent'],
    },
  ],
});

/**
 * Refer to the [Icons](/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = React.forwardRef(function IconButton(props, ref) {
  const {
    edge = false,
    children,
    className,
    color = 'primary',
    disabled = false,
    disableFocusRipple = false,
    disableRipple = false,
    size = 'medium',
    ...other
  } = props;

  return (
    <ButtonBase
      className={mergeStyles(
        'JrIconButton-root',
        iconButtonVariants({ disableRipple: disableRipple, edge: edge, size: size, color: color }),
        className,
        'm-',
      )}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      disableRipple={disableRipple}
      ref={ref}
      {...other}
    >
      {children}
    </ButtonBase>
  );
});

export default IconButton;
