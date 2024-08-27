'use client';
import * as React from 'react';

import mergeStyles from '@janribka/utils/mergeStyles';

import ButtonBase from '../ButtonBase';
import ButtonGroupButtonContext from '../ButtonGroup/ButtonGroupButtonContext';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import { styled } from '../zero-styled';
import { ButtonProps } from './ButtonProps';
import buttonVariants from './buttonVariants';
import endIconVariants from './endIconVariants copy';
import startIconVariants from './startIconVariants';

// TODO: Výsledný build je brutálně velký soubor
const Button = function Button(props: ButtonProps) {
  // Props
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
    ref,
    ...restProps
  } = props;
  const contextProps = React.useContext(ButtonGroupContext);

  // Class names
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const positionClassName = buttonGroupButtonContextPositionClassName || '';

  // Icons;
  const startIcon = startIconProp && (
    <span className={startIconVariants({ size: size })}>{startIconProp}</span>
  );

  const endIcon = endIconProp && (
    <span className={endIconVariants({ size: size })}>{endIconProp}</span>
  );

  return (
    <ButtonBase
      // className={mergeStyles(contextProps.className, classes.root, className, positionClassName)}
      className={mergeStyles(
        buttonVariants({}),
        contextProps.className,
        className,
        positionClassName,
      )}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={mergeStyles(focusVisibleClassName)}
      // focusVisibleClassName={mergeStyles(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      type={type}
      {...restProps}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonBase>
  );
};

export default Button;
