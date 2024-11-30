'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';
import { useDefaultProps } from '../DefaultPropsProvider';

const iconButtonVariants = tv({
  base: [
    'text-center',
    'flex-noneAuto',
    'text-2xl',
    'p-2',
    'rounded-[50%]',
    'text-action-active',
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
      className: ['hover:bg-primary/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'secondary',
      className: ['hover:bg-secondary/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'success',
      className: ['hover:bg-success/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'error',
      className: ['hover:bg-error/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'info',
      className: ['hover:bg-info/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'warning',
      className: ['hover:bg-warning/hover', 'hover:hover-none:bg-transparent'],
    },
    {
      disableRipple: false,
      color: 'inherit',
      className: ['hover:bg-inherit/hover', 'hover:hover-none:bg-transparent'],
    },
  ],
});

const IconButton = React.forwardRef(function IconButton(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrIconButton' });
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

  return (
    <ButtonBase
      className={mergeStyles(
        'JrIconButton-root',
        iconButtonVariants({ disableRipple: disableRipple, edge: edge, size: size, color: color }),
        className,
        '',
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

IconButton.propTypes /* remove-proptypes */ = {
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
   * @default 'default'
   */
  color: PropTypes.oneOf([
    'default',
    'error',
    'info',
    'inherit',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The icon to display.
   */
  children: PropTypes.node,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default IconButton;
