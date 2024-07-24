"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ButtonBaseProps: true,
  buttonBaseClasses: true,
  touchRippleClasses: true
};
Object.defineProperty(exports, "ButtonBaseProps", {
  enumerable: true,
  get: function get() {
    return _ButtonBaseProps["default"];
  }
});
Object.defineProperty(exports, "buttonBaseClasses", {
  enumerable: true,
  get: function get() {
    return _buttonBaseClasses["default"];
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ButtonBase["default"];
  }
});
Object.defineProperty(exports, "touchRippleClasses", {
  enumerable: true,
  get: function get() {
    return _touchRippleClasses["default"];
  }
});
var _ButtonBase = _interopRequireDefault(require("./ButtonBase"));
var _ButtonBaseProps = _interopRequireWildcard(require("./ButtonBaseProps"));
Object.keys(_ButtonBaseProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ButtonBaseProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ButtonBaseProps[key];
    }
  });
});
var _buttonBaseClasses = _interopRequireWildcard(require("./buttonBaseClasses"));
Object.keys(_buttonBaseClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _buttonBaseClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _buttonBaseClasses[key];
    }
  });
});
var _touchRippleClasses = _interopRequireWildcard(require("./touchRippleClasses"));
Object.keys(_touchRippleClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _touchRippleClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _touchRippleClasses[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }