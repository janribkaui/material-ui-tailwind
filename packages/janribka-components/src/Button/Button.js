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
        // 'text-white',
        // 'bg-primary-main',
        // 'shadow-md',
        // 'hover:shadow-lg',
        // 'active:shadow-xl',
        // 'focus-visible:shadow-lg',
        // 'disabled:bg-action-disabled',
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
    color: ({ colors }) => {
      debugger;
      console.log('colors', colors);
      Object.entries(colors).filter((acc, color) => {
        acc[color] = {
          contained: [
            `text-${color}-contrastText`,
            `bg-${color}-main`,
            `hover:bg-${color}-dark`,
            `active:bg-${color}-darker`,
            `focus-visible:bg-${color}-dark`,
            `disabled:bg-${color}-disabled`,
          ],
          outlined: [
            `text-${color}-main`,
            `border-${color}-main`,
            `hover:bg-${color}-light`,
            `active:bg-${color}-lighter`,
            `focus-visible:bg-${color}-light`,
            `disabled:border-${color}-disabled`,
          ],
          text: [
            `text-${color}-main`,
            `hover:bg-${color}-light`,
            `active:bg-${color}-lighter`,
            `focus-visible:bg-${color}-light`,
            `disabled:text-${color}-disabled`,
          ],
        };
        return acc;
      }, {});
    },
    // colors: Object.entries(props.colors).filter((acc, color) => {
    //   acc[color] = {
    //     contained: [
    //       `text-${color}-contrastText`,
    //       `bg-${color}-main`,
    //       `hover:bg-${color}-dark`,
    //       `active:bg-${color}-darker`,
    //       `focus-visible:bg-${color}-dark`,
    //       `disabled:bg-${color}-disabled`,
    //     ],
    //     outlined: [
    //       `text-${color}-main`,
    //       `border-${color}-main`,
    //       `hover:bg-${color}-light`,
    //       `active:bg-${color}-lighter`,
    //       `focus-visible:bg-${color}-light`,
    //       `disabled:border-${color}-disabled`,
    //     ],
    //     text: [
    //       `text-${color}-main`,
    //       `hover:bg-${color}-light`,
    //       `active:bg-${color}-lighter`,
    //       `focus-visible:bg-${color}-light`,
    //       `disabled:text-${color}-disabled`,
    //     ],
    //   };
    //   return acc;
    // }, {}),
  },
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
  return (
    <ButtonBase
      // ownerState={ownerState}
      className={mergeStyles(
        'JrButton-root',
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
