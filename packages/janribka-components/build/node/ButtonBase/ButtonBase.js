"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _isFocusVisible = _interopRequireDefault(require("@janribka/utils/isFocusVisible"));
var _mergeStyles = _interopRequireDefault(require("@janribka/utils/mergeStyles"));
var _useEventCallback = _interopRequireDefault(require("@janribka/utils/useEventCallback"));
var _useForkRef = _interopRequireDefault(require("@janribka/utils/useForkRef"));
var _useLazyRipple = _interopRequireDefault(require("../useLazyRipple/useLazyRipple"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type", "ref"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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

var ButtonBase = function ButtonBase(props) {
  // Props
  var action = props.action,
    _props$centerRipple = props.centerRipple,
    centerRipple = _props$centerRipple === void 0 ? false : _props$centerRipple,
    children = props.children,
    className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'button' : _props$component,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$disableRipple = props.disableRipple,
    disableRipple = _props$disableRipple === void 0 ? false : _props$disableRipple,
    _props$disableTouchRi = props.disableTouchRipple,
    disableTouchRipple = _props$disableTouchRi === void 0 ? false : _props$disableTouchRi,
    _props$focusRipple = props.focusRipple,
    focusRipple = _props$focusRipple === void 0 ? false : _props$focusRipple,
    focusVisibleClassName = props.focusVisibleClassName,
    _props$LinkComponent = props.LinkComponent,
    LinkComponent = _props$LinkComponent === void 0 ? 'a' : _props$LinkComponent,
    onBlur = props.onBlur,
    onClick = props.onClick,
    onContextMenu = props.onContextMenu,
    onDragLeave = props.onDragLeave,
    onFocus = props.onFocus,
    onFocusVisible = props.onFocusVisible,
    onKeyDown = props.onKeyDown,
    onKeyUp = props.onKeyUp,
    onMouseDown = props.onMouseDown,
    onMouseLeave = props.onMouseLeave,
    onMouseUp = props.onMouseUp,
    onTouchEnd = props.onTouchEnd,
    onTouchMove = props.onTouchMove,
    onTouchStart = props.onTouchStart,
    _props$tabIndex = props.tabIndex,
    tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
    TouchRippleProps = props.TouchRippleProps,
    touchRippleRef = props.touchRippleRef,
    type = props.type,
    ref = props.ref,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded);

  // References
  var buttonRef = React.useRef(null);
  var handleRef = (0, _useForkRef["default"])(ref, buttonRef);

  // Ripple effect
  var ripple = (0, _useLazyRipple["default"])();
  var handleRippleRef = (0, _useForkRef["default"])(ripple.ref, touchRippleRef);
  var enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    focusVisible = _React$useState2[0],
    setFocusVisible = _React$useState2[1];
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React.useEffect(function () {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);
  function useRippleHandler(rippleAction, eventCallback) {
    var skipRippleAction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : disableTouchRipple;
    return (0, _useEventCallback["default"])(function (event) {
      if (eventCallback) {
        eventCallback(event);
      }
      var ignore = skipRippleAction;
      if (!ignore) {
        ripple[rippleAction](event);
      }
      return true;
    });
  }

  // Handlers
  var isNonNativeButton = function isNonNativeButton() {
    var button = buttonRef.current;
    return (
      // component && component !== 'button' && button && !(button.tagName === 'A' && button.href)
      false
    );
  };
  var handleMouseDown = useRippleHandler('start', onMouseDown);
  var handleContextMenu = useRippleHandler('stop', onContextMenu);
  var handleDragLeave = useRippleHandler('stop', onDragLeave);
  var handleMouseUp = useRippleHandler('stop', onMouseUp);
  var handleMouseLeave = useRippleHandler('stop', function (event) {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  var handleTouchStart = useRippleHandler('start', onTouchStart);
  var handleTouchEnd = useRippleHandler('stop', onTouchEnd);
  var handleTouchMove = useRippleHandler('stop', onTouchMove);
  var handleBlur = useRippleHandler('stop', function (event) {
    if (!(0, _isFocusVisible["default"])(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  var handleFocus = (0, _useEventCallback["default"])(function (event) {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    if ((0, _isFocusVisible["default"])(event.target)) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  var handleKeyDown = (0, _useEventCallback["default"])(function (event) {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !event.repeat && focusVisible && event.key === ' ') {
      ripple.stop(event, function () {
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
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === 'Enter' && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  var handleKeyUp = (0, _useEventCallback["default"])(function (event) {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && focusVisible && !event.defaultPrevented) {
      ripple.stop(event, function () {
        ripple.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }

    // Keyboard accessibility for non interactive elements
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === ' ' && !event.defaultPrevented) {
      onClick(event);
    }
  });

  // Props
  var ComponentProp = component;

  // if (ComponentProp === 'button' && (restProps.href || restProps.to)) {
  //   ComponentProp = LinkComponent;
  // }

  var buttonProps = {};

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

  var ownerState = _objectSpread(_objectSpread({}, props), {}, {
    centerRipple: centerRipple,
    component: component,
    disabled: disabled,
    disableRipple: disableRipple,
    disableTouchRipple: disableTouchRipple,
    focusRipple: focusRipple,
    tabIndex: tabIndex,
    focusVisible: focusVisible
  });

  // Classes
  // const classes = useUtilityClasses(ownerState);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", _objectSpread(_objectSpread(_objectSpread({
    // as={ComponentProp}
    // className={clsx(classes.root, className)}
    className: (0, _mergeStyles["default"])('inline-flex', 'items-center', 'justify-center', 'relative', 'box-border', 'bg-transparent', 'outline-0', 'border-0', 'm-0', 'rounded-none', 'p-0', 'cursor-pointer', 'select-none', 'align-middle', 'appearance-none', 'no-underline', 'text-inherit', 'border-none', 'disabled:pointer-events-none disabled:cursor-default', className)
    // ownerState={ownerState}
    ,
    onBlur: handleBlur,
    onClick: onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type: type
  }, buttonProps), restProps), {}, {
    children: children
  }));
};
var _default = exports["default"] = ButtonBase;