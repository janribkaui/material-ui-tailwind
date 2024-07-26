import ButtonBase from '../ButtonBase';
import { ButtonProps } from './ButtonProps';

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

  // Classes
  // const classes = useUtilityClasses(ownerState);

  // Icons
  // const startIcon = startIconProp && (
  //   <ButtonStartIcon className={classes.startIcon} ownerState={ownerState}>
  //     {startIconProp}
  //   </ButtonStartIcon>
  // );

  // const endIcon = endIconProp && (
  //   <ButtonEndIcon className={classes.endIcon} ownerState={ownerState}>
  //     {endIconProp}
  //   </ButtonEndIcon>
  // );

  return (
    <ButtonBase
      //   ownerState={ownerState}
      //   className={clsx(contextProps.className, classes.root, className, positionClassName)}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      //   focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      type={type}
      {...restProps}
      //   classes={classes}
    >
      {/* {startIcon} */}
      {children}
      {/* {endIcon} */}
    </ButtonBase>
  );
};

export default Button;
