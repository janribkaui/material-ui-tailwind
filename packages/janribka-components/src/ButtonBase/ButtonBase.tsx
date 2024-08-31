'use client';

import * as React from 'react';

import isFocusVisible from '@janribka/utils/isFocusVisible';
import mergeStyles from '@janribka/utils/mergeStyles';
import useEventCallback from '@janribka/utils/useEventCallback';
import useForkRef from '@janribka/utils/useForkRef';

import { OverridableComponent, OverridableTypeMap, OverrideProps } from '../OverridableComponent';
import useLazyRipple from '../useLazyRipple/useLazyRipple';
import { ButtonBaseClasses } from './buttonBaseClasses';
import TouchRipple, { TouchRippleActions, TouchRippleProps } from './TouchRipple';

// Types
export interface ButtonBaseOwnProps {
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<ButtonBaseActions>;
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple?: boolean;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonBaseClasses>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple?: boolean;
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple?: boolean;
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName?: string;
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent?: React.ElementType;
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible?: React.FocusEventHandler<any>;
  /**
   * @default 0
   */
  tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps?: Partial<TouchRippleProps>;
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef?: React.Ref<TouchRippleActions>;
}

export interface ButtonBaseTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> {
  props: AdditionalProps & ButtonBaseOwnProps;
  defaultComponent: RootComponent;
}

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonBaseTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & Omit<ButtonBaseTypeMap['props'], 'classes'>;
  defaultComponent: TypeMap['defaultComponent'];
}

export type ExtendButtonBase<TypeMap extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<TypeMap>, 'a'>,
) => React.JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<TypeMap>>;

export type ButtonBaseProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonBaseTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface ButtonBaseActions {
  focusVisible(): void;
}

// Content
/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
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

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return (
      component && component !== 'button' && !(button?.tagName === 'A' && (button as any).href)
    );
  };

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

  if (ComponentProp === 'button' && ((restProps as any).href || (restProps as any).to)) {
    ComponentProp = LinkComponent;
  }

  const buttonProps: ButtonBaseProps = {};

  if (ComponentProp === 'button') {
    buttonProps.type = type === undefined ? 'button' : type;
    buttonProps.disabled = disabled;
  } else {
    if (!(restProps as any).href && !(restProps as any).to) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  // Class names
  const buttonBaseClassName = mergeStyles(
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
  );

  //
  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [],
  );

  return (
    <button
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
      {...restProps}
    >
      {children}
      {enableTouchRipple ? (
        <TouchRipple ref={handleRippleRef} center={centerRipple} {...TouchRippleProps} />
      ) : null}
    </button>
  );
};

export default ButtonBase;
