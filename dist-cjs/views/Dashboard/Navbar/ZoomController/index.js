"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _decimal = _interopRequireDefault(require("decimal.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../redux/canvas/actions");

var _styles = _interopRequireDefault(require("./styles"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZoomController = function ZoomController() {
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var scale = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.scale;
  });
  var onZoomInClick = (0, _react.useCallback)(function () {
    return dispatch((0, _actions.increaseZoom)());
  }, [dispatch]);
  var onZoomOutClick = (0, _react.useCallback)(function () {
    return dispatch((0, _actions.decreaseZoom)());
  }, [dispatch]);
  return /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.controller
  }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    color: "inherit",
    "aria-label": "decrease-zoom",
    onClick: onZoomOutClick
  }, /*#__PURE__*/_react.default.createElement(_icons.RemoveCircleOutline, null)), /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.value
  }, new _decimal.default(scale).mul(100).toFixed(0), "%"), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    color: "inherit",
    "aria-label": "increase-zoom",
    onClick: onZoomInClick
  }, /*#__PURE__*/_react.default.createElement(_icons.AddCircleOutline, null)));
};

var _default = /*#__PURE__*/_react.default.memo(ZoomController);

exports.default = _default;