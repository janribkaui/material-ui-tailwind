'use client';

import * as React from 'react';

import isFocusVisible from '@janribka/utils/isFocusVisible';
import mergeStyles from '@janribka/utils/mergeStyles';
import useEventCallback from '@janribka/utils/useEventCallback';
import useForkRef from '@janribka/utils/useForkRef';

import useLazyRipple from '../useLazyRipple/useLazyRipple';
import { ButtonBaseProps } from './ButtonBaseProps';

// const useUtilityClasses = (ownerState) => {
//   const { disabled, focusVisible, focusVisibleClassName, classes } = ownerState;

//   const slots = {
//     root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
//   };

//   const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);

//   if (focusVisible && focusVisibleClassName) {
//     composedClasses.root += ` ${focusVisibleClassName}`;
//   }

//   return composedClasses;
// };

const ButtonBase = function ButtonBase(props: ButtonBaseProps) {
  // Props
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    LinkComponent = 'a',
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type,
    ref,
    ...restProps
  } = props;

  // References
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const handleRef = useForkRef(ref, buttonRef);

  // Ripple effect
  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ripple.ref, touchRippleRef);
  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;

  const [focusVisible, setFocusVisible] = React.useState(false);

  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);

  function useRippleHandler(
    rippleAction: 'start' | 'stop' | 'pulsate',
    eventCallback:
      | React.MouseEventHandler<HTMLButtonElement>
      | React.DragEventHandler<HTMLButtonElement>
      | React.TouchEventHandler<HTMLButtonElement>
      | undefined,
    skipRippleAction = disableTouchRipple,
  ) {
    return useEventCallback((event) => {
      if (eventCallback) {
        eventCallback(
          event as React.MouseEvent<HTMLButtonElement> &
            React.DragEvent<HTMLButtonElement> &
            React.TouchEvent<HTMLButtonElement>,
        );
      }

      const ignore = skipRippleAction;
      if (!ignore) {
        ripple[rippleAction](event as any);
      }

      return true;
    });
  }

  // Handlers
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return (
      // component && component !== 'button' && button && !(button.tagName === 'A' && button.href)
      false
    );
  };

  const handleMouseDown = useRippleHandler('start', onMouseDown);
  const handleContextMenu = useRippleHandler('stop', onContextMenu);
  const handleDragLeave = useRippleHandler('stop', onDragLeave);
  const handleMouseUp = useRippleHandler('stop', onMouseUp);
  const handleMouseLeave = useRippleHandler('stop', (event: any) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler('start', onTouchStart);
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
  const handleTouchMove = useRippleHandler('stop', onTouchMove);

  const handleBlur = useRippleHandler(
    'stop',
    (event: any) => {
      if (!isFocusVisible(event.target)) {
        setFocusVisible(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    },
    false,
  );

  const handleFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement, Element>) => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }

    if (isFocusVisible(event.target)) {
      setFocusVisible(true);

      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }

    if (onFocus) {
      onFocus(event);
    }
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !event.repeat && focusVisible && event.key === ' ') {
      ripple.stop(event, () => {
        ripple.start(event);
      });
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === 'Enter' &&
      !disabled
    ) {
      event.preventDefault();
      if (onClick) {
        onClick(event as any);
      }
    }
  });

  const handleKeyUp = useEventCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && focusVisible && !event.defaultPrevented) {
      ripple.stop(event, () => {
        ripple.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }

    // Keyboard accessibility for non interactive elements
    if (
      onClick &&
      event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === ' ' &&
      !event.defaultPrevented
    ) {
      onClick(event as any);
    }
  });

  // Props
  let ComponentProp = component;

  // if (ComponentProp === 'button' && (restProps.href || restProps.to)) {
  //   ComponentProp = LinkComponent;
  // }

  const buttonProps = {};

  // if (ComponentProp === 'button') {
  //   buttonProps.type = type === undefined ? 'button' : type;
  //   buttonProps.disabled = disabled;
  // } else {
  //   if (!restProps.href && !restProps.to) {
  //     buttonProps.role = 'button';
  //   }
  //   if (disabled) {
  //     buttonProps['aria-disabled'] = disabled;
  //   }
  // }

  const ownerState = {
    ...props,
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible,
  };

  // Classes
  // const classes = useUtilityClasses(ownerState);

  return (
    <button
      // as={ComponentProp}
      // className={clsx(classes.root, className)}
      className={mergeStyles(
        'inline-flex',
        'items-center',
        'justify-center',
        'relative',
        'box-border',
        'bg-transparent',
        'outline-0',
        'border-0',
        'm-0',
        'rounded-none',
        'p-0',
        'cursor-pointer',
        'select-none',
        'align-middle',
        'appearance-none',
        'no-underline',
        'text-inherit',
        'border-none',
        'disabled:pointer-events-none disabled:cursor-default',
        className,
      )}
      // ownerState={ownerState}
      onBlur={handleBlur}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onDragLeave={handleDragLeave}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={handleRef}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
      {...buttonProps}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
