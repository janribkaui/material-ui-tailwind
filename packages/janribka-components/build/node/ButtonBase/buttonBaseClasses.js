"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.getButtonBaseUtilityClass = getButtonBaseUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@janribka/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@janribka/utils/generateUtilityClasses"));
function getButtonBaseUtilityClass(slot) {
  return (0, _generateUtilityClass["default"])("JrButtonBase", slot);
}
var buttonBaseClasses = (0, _generateUtilityClasses["default"])("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var _default = exports["default"] = buttonBaseClasses;