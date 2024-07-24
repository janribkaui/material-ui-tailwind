"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.getTouchRippleUtilityClass = getTouchRippleUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@janribka/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@janribka/utils/generateUtilityClasses"));
function getTouchRippleUtilityClass(slot) {
  return (0, _generateUtilityClass["default"])('MuiTouchRipple', slot);
}
var touchRippleClasses = (0, _generateUtilityClasses["default"])('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);
var _default = exports["default"] = touchRippleClasses;