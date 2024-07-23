"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateUtilityClass;
exports.globalStateClasses = void 0;
exports.isGlobalState = isGlobalState;
var _ClassNameGenerator = _interopRequireDefault(require("../ClassNameGenerator"));
var globalStateClasses = exports.globalStateClasses = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function generateUtilityClass(componentName, slot) {
  var globalStatePrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Jr";
  var globalStateClass = globalStateClasses[slot];
  return globalStateClass ? "".concat(globalStatePrefix, "-").concat(globalStateClass) : "".concat(_ClassNameGenerator["default"].generate(componentName), "-").concat(slot);
}
function isGlobalState(slot) {
  return globalStateClasses[slot] !== undefined;
}