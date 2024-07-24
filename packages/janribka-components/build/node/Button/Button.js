"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant", "ref"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Button = function Button(props) {
  // Props
  var children = props.children,
    _props$color = props.color,
    color = _props$color === void 0 ? 'primary' : _props$color,
    _props$component = props.component,
    component = _props$component === void 0 ? 'button' : _props$component,
    className = props.className,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$disableElevati = props.disableElevation,
    disableElevation = _props$disableElevati === void 0 ? false : _props$disableElevati,
    _props$disableFocusRi = props.disableFocusRipple,
    disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
    endIconProp = props.endIcon,
    focusVisibleClassName = props.focusVisibleClassName,
    _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    _props$size = props.size,
    size = _props$size === void 0 ? 'medium' : _props$size,
    startIconProp = props.startIcon,
    type = props.type,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'text' : _props$variant,
    ref = props.ref,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded);
  var ownerState = _objectSpread(_objectSpread({}, props), {}, {
    color: color,
    component: component,
    disabled: disabled,
    disableElevation: disableElevation,
    disableFocusRipple: disableFocusRipple,
    fullWidth: fullWidth,
    size: size,
    type: type,
    variant: variant
  });

  // Classes
  // const classes = useUtilityClasses(ownerState);

  // Icons
  var startIcon = startIconProp && /*#__PURE__*/(0, _jsxRuntime.jsx)(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState: ownerState,
    children: startIconProp
  });
  var endIcon = endIconProp && /*#__PURE__*/(0, _jsxRuntime.jsx)(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState: ownerState,
    children: endIconProp
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ButtonBase["default"]
  //   ownerState={ownerState}
  //   className={clsx(contextProps.className, classes.root, className, positionClassName)}
  , _objectSpread(_objectSpread({
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple
    //   focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
    ,
    ref: ref,
    type: type
  }, restProps), {}, {
    children: [startIcon, children, endIcon]
  }));
};
var _default = exports["default"] = Button;