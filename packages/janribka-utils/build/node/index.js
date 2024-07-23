/**
 * @janribka/utils v0.0.0
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  mergeStyles: true,
  unstable_generateUtilityClass: true,
  unstable_isGlobalState: true,
  unstable_generateUtilityClasses: true,
  unstable_useForkRef: true,
  unstable_useLazyRef: true,
  unstable_setRef: true,
  unstable_useEnhancedEffect: true,
  unstable_useEventCallback: true,
  unstable_isFocusVisible: true
};
Object.defineProperty(exports, "mergeStyles", {
  enumerable: true,
  get: function get() {
    return _mergeStyles["default"];
  }
});
Object.defineProperty(exports, "unstable_generateUtilityClass", {
  enumerable: true,
  get: function get() {
    return _generateUtilityClass["default"];
  }
});
Object.defineProperty(exports, "unstable_generateUtilityClasses", {
  enumerable: true,
  get: function get() {
    return _generateUtilityClasses["default"];
  }
});
Object.defineProperty(exports, "unstable_isFocusVisible", {
  enumerable: true,
  get: function get() {
    return _isFocusVisible["default"];
  }
});
Object.defineProperty(exports, "unstable_isGlobalState", {
  enumerable: true,
  get: function get() {
    return _generateUtilityClass.isGlobalState;
  }
});
Object.defineProperty(exports, "unstable_setRef", {
  enumerable: true,
  get: function get() {
    return _setRef["default"];
  }
});
Object.defineProperty(exports, "unstable_useEnhancedEffect", {
  enumerable: true,
  get: function get() {
    return _useEnhancedEffect["default"];
  }
});
Object.defineProperty(exports, "unstable_useEventCallback", {
  enumerable: true,
  get: function get() {
    return _useEventCallback["default"];
  }
});
Object.defineProperty(exports, "unstable_useForkRef", {
  enumerable: true,
  get: function get() {
    return _useForkRef["default"];
  }
});
Object.defineProperty(exports, "unstable_useLazyRef", {
  enumerable: true,
  get: function get() {
    return _useLazyRef["default"];
  }
});
var _mergeStyles = _interopRequireDefault(require("./mergeStyles"));
var _generateUtilityClass = _interopRequireWildcard(require("./generateUtilityClass"));
Object.keys(_generateUtilityClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _generateUtilityClass[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _generateUtilityClass[key];
    }
  });
});
var _generateUtilityClasses = _interopRequireDefault(require("./generateUtilityClasses"));
var _useForkRef = _interopRequireDefault(require("./useForkRef"));
var _useLazyRef = _interopRequireDefault(require("./useLazyRef"));
var _setRef = _interopRequireDefault(require("./setRef"));
var _useEnhancedEffect = _interopRequireDefault(require("./useEnhancedEffect"));
var _useEventCallback = _interopRequireDefault(require("./useEventCallback"));
var _isFocusVisible = _interopRequireDefault(require("./isFocusVisible"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }