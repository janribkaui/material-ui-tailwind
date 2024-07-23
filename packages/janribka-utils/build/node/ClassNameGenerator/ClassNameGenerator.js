"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var defaultGenerator = function defaultGenerator(componentName) {
  return componentName;
};
var createClassNameGenerator = function createClassNameGenerator() {
  var _generate = defaultGenerator;
  return {
    configure: function configure(generator) {
      _generate = generator;
    },
    generate: function generate(componentName) {
      return _generate(componentName);
    },
    reset: function reset() {
      _generate = defaultGenerator;
    }
  };
};
var ClassNameGenerator = createClassNameGenerator();
var _default = exports["default"] = ClassNameGenerator;