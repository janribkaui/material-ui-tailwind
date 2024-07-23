'use client';
import * as React from 'react';

import isFocusVisible from '@janribka/utils/isFocusVisible';
import useEventCallback from '@janribka/utils/useEventCallback';
import useForkRef from '@janribka/utils/useForkRef';

import useLazyRipple from '../useLazyRipple/useLazyRipple';
import { ButtonBaseProps } from './ButtonBaseProps';

const ButtonBase = function ButtonBase(props: ButtonBaseProps) {
  // References
  const buttonRef = React.useRef<HTMLButtonElement>(null);

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
    ...restProps
  } = props;

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
    rippleAction: 'start' | 'stop',
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
          event as React.MouseEvent<HTMLButtonElement, MouseEvent> &
            React.DragEvent<HTMLButtonElement> &
            React.TouchEvent<HTMLButtonElement>,
        );
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

  return (
    <button
      ref={refButton}
      disabled={disabled}
      aria-disabled={disabled}
      className={mergeStyles(
        className,
        d3SButtonBaseVariants({
          size: size,
          variant: variant,
          radius: radius,
          disabled: disabled,
        }),
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default D3SButtonBase;
