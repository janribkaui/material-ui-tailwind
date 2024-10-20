'use client';
import * as React from 'react';
import { useDefaultProps } from '../DefaultPropsProvider';
import isFocusVisible from '@janribkaui/utils/isFocusVisible';
import styled from 'styled-components';
import useForkRef from '../utils/useForkRef';
import useEventCallback from '../utils/useEventCallback';
import useLazyRipple from '../useLazyRipple';
import TouchRipple from './TouchRipple';
import mergeStyles from '../utils/mergeStyles';

export const ButtonBaseRoot = styled.button({
  WebkitTapHighlightColor: 'transparent',
  MozAppearance: 'none', // Reset
  WebkitAppearance: 'none', // Reset
  textDecoration: 'none',
  '&::-moz-focus-inner': {
    borderStyle: 'none', // Remove Firefox dotted outline.
  },
  '@media print': {
    colorAdjust: 'exact',
  },
});

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
const ButtonBase = React.forwardRef(function ButtonBase(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrButtonBase' });
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
    ...other
  } = props;

  const buttonRef = React.useRef(null);

  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ripple.ref, touchRippleRef);

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current.focus();
      },
    }),
    [],
  );

  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;

  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);

  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback((event) => {
      if (eventCallback) {
        eventCallback(event);
      }

      const ignore = skipRippleAction;
      if (!ignore) {
        ripple[rippleAction](event);
      }

      return true;
    });
  }

  const handleMouseDown = useRippleHandler('start', onMouseDown);
  const handleContextMenu = useRippleHandler('stop', onContextMenu);
  const handleDragLeave = useRippleHandler('stop', onDragLeave);
  const handleMouseUp = useRippleHandler('stop', onMouseUp);
  const handleMouseLeave = useRippleHandler('stop', (event) => {
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
    (event) => {
      if (!isFocusVisible(event.target)) {
        setFocusVisible(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    },
    false,
  );

  const handleFocus = useEventCallback((event) => {
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

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== 'button' && !(button.tagName === 'A' && button.href);
  };

  const handleKeyDown = useEventCallback((event) => {
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
        onClick(event);
      }
    }
  });

  const handleKeyUp = useEventCallback((event) => {
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
      event.key === ' ' &&
      !event.defaultPrevented
    ) {
      onClick(event);
    }
  });

  let ComponentProp = component;

  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }

  const buttonProps = {};

  if (ComponentProp === 'button') {
    buttonProps.type = type === undefined ? 'button' : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  const handleRef = useForkRef(ref, buttonRef);

  const buttonBaseClassName = mergeStyles(
    'JrButtonBase-root',
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
    'text-inherit',
    'disabled:pointer-events-none disabled:cursor-default',
    className,
  );

  return (
    <ButtonBaseRoot
      as={ComponentProp}
      className={buttonBaseClassName}
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
      {...other}
    >
      {children}
      {enableTouchRipple ? (
        <TouchRipple ref={handleRippleRef} center={centerRipple} {...TouchRippleProps} />
      ) : null}
    </ButtonBaseRoot>
  );
});

export default ButtonBase;
