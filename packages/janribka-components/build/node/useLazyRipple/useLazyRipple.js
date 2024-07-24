"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LazyRipple = void 0;
exports["default"] = useLazyRipple;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _useLazyRef = _interopRequireDefault(require("@janribka/utils/useLazyRef"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Lazy initialization container for the Ripple instance. This improves
 * performance by delaying mounting the ripple until it's needed.
 */
var LazyRipple = exports.LazyRipple = /*#__PURE__*/function () {
  function LazyRipple() {
    var _this = this;
    (0, _classCallCheck2["default"])(this, LazyRipple);
    (0, _defineProperty2["default"])(this, "mountEffect", function () {
      if (_this.shouldMount && !_this.didMount) {
        if (_this.ref.current !== null) {
          _this.didMount = true;
          _this.mounted.resolve();
        }
      }
    });
    this.ref = {
      current: null
    };
    this.mounted = null;
    this.didMount = false;
    this.shouldMount = false;
    this.setShouldMount = null;
  }
  return (0, _createClass2["default"])(LazyRipple, [{
    key: "mount",
    value: function mount() {
      if (!this.mounted) {
        this.mounted = createControlledPromise();
        this.shouldMount = true;
        this.setShouldMount(this.shouldMount);
      }
      return this.mounted;
    }
  }, {
    key: "start",
    value: /* Ripple API */

    function start() {
      var _this2 = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this.mount().then(function () {
        var _this2$ref$current;
        return (_this2$ref$current = _this2.ref.current) == null ? void 0 : _this2$ref$current.start.apply(_this2$ref$current, args);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this.mount().then(function () {
        var _this3$ref$current;
        return (_this3$ref$current = _this3.ref.current) == null ? void 0 : _this3$ref$current.stop.apply(_this3$ref$current, args);
      });
    }
  }, {
    key: "pulsate",
    value: function pulsate() {
      var _this4 = this;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this.mount().then(function () {
        var _this4$ref$current;
        return (_this4$ref$current = _this4.ref.current) == null ? void 0 : _this4$ref$current.pulsate.apply(_this4$ref$current, args);
      });
    }
  }], [{
    key: "create",
    value: /** React ref to the ripple instance */

    /** If the ripple component should be mounted */

    /** Promise that resolves when the ripple component is mounted */

    /** If the ripple component has been mounted */

    /** React state hook setter */

    function create() {
      return new LazyRipple();
    }
  }, {
    key: "use",
    value: function use() {
      /* eslint-disable */
      var ripple = (0, _useLazyRef["default"])(LazyRipple.create).current;
      var _React$useState = React.useState(false),
        _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
        shouldMount = _React$useState2[0],
        setShouldMount = _React$useState2[1];
      ripple.shouldMount = shouldMount;
      ripple.setShouldMount = setShouldMount;
      React.useEffect(ripple.mountEffect, [shouldMount]);
      /* eslint-enable */

      return ripple;
    }
  }]);
}();
function useLazyRipple() {
  return LazyRipple.use();
}
function createControlledPromise() {
  var resolve;
  var reject;
  var p = new Promise(function (resolveFn, rejectFn) {
    resolve = resolveFn;
    reject = rejectFn;
  });
  p.resolve = resolve;
  p.reject = reject;
  return p;
}