import * as React from 'react';

import { DistributiveOmit, OverridableStringUnion } from '@janribka/types';
import mergeStyles from '@janribka/utils/mergeStyles';

import ButtonBase, { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
// import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase/ButtonBaseProps';
import ButtonGroupButtonContext from '../ButtonGroup/ButtonGroupButtonContext';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '../OverridableComponent';
// import { Theme } from '../styles';
import { ButtonClasses } from './buttonClasses';
// import { styled } from '../zero-styled';
import buttonVariants from './buttonVariants';
import endIconVariants from './endIconVariants';
import startIconVariants from './startIconVariants';

// Types
export interface ButtonPropsVariantOverrides {}

export interface ButtonPropsColorOverrides {}

export interface ButtonPropsSizeOverrides {}

export interface ButtonOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation?: boolean;
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
  /**
   * Element placed after the children.
   */
  endIcon?: React.ReactNode;
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
  /**
   * The variant to use.
   * @default 'text'
   */
  variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>;
}

export type ButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ButtonOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] &
    (TypeMap['props'] extends { classes?: Record<string, string> }
      ? DistributiveOmit<ButtonTypeMap['props'], 'classes'>
      : ButtonTypeMap['props']);
  defaultComponent: TypeMap['defaultComponent'];
}

export type ExtendButton<TypeMap extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<TypeMap>, 'a'>,
) => React.JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<TypeMap>>;

export type ButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

// Button
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
