"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Navbar = function Navbar() {
  var classes = (0, _styles.default)();
  var windowDimension = (0, _reactRedux.useSelector)(function (state) {
    return state.core.windowDimension;
  });
  return /*#__PURE__*/_react.default.createElement(_core.AppBar, {
    position: "fixed",
    className: classes.appBar
  }, /*#__PURE__*/_react.default.createElement(_core.Toolbar, null, windowDimension && windowDimension.width >= 1028 ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    className: classes.title
  }, "Advanced Design")) : /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    className: classes.title
  }, ' '), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    edge: "end",
    className: classes.rightMenuButton,
    color: "inherit",
    "aria-label": "menu",
    onClick: function onClick() {}
  }, /*#__PURE__*/_react.default.createElement(_icons.Menu, null))), windowDimension && windowDimension.width < 1028 ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    className: classes.titleToolbar
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    className: classes.title
  }, "Advanced Design")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    className: classes.subToolbar,
    direction: "row",
    justify: "flex-end"
  })) : null);
};

var _default = /*#__PURE__*/_react.default.memo(Navbar);

exports.default = _default;