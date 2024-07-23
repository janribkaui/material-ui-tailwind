"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateUtilityClasses;
var _generateUtilityClass = _interopRequireDefault(require("../generateUtilityClass"));
function generateUtilityClasses(componentName, slots) {
  var globalStatePrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Jr";
  var result = {};
  slots.forEach(function (slot) {
    result[slot] = (0, _generateUtilityClass["default"])(componentName, slot, globalStatePrefix);
  });
  return result;
}