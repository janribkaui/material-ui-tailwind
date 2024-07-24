'use client';

import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import useLazyRef from '@janribka/utils/useLazyRef';
/**
 * Lazy initialization container for the Ripple instance. This improves
 * performance by delaying mounting the ripple until it's needed.
 */
export var LazyRipple = /*#__PURE__*/function () {
  function LazyRipple() {
    var _this = this;
    _classCallCheck(this, LazyRipple);
    _defineProperty(this, "mountEffect", function () {
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
  return _createClass(LazyRipple, [{
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
      var ripple = useLazyRef(LazyRipple.create).current;
      var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
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
export default function useLazyRipple() {
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