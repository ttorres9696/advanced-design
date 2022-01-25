"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _redux = _interopRequireDefault(require("./redux"));

var _theme = _interopRequireDefault(require("./shared/theme"));

var _views = require("./views");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AdvancedDesignCore = function AdvancedDesignCore(_ref) {
  var solarDesign = _ref.solarDesign,
      callbackProps = _objectWithoutProperties(_ref, ["solarDesign"]);

  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _redux.default
  }, /*#__PURE__*/_react.default.createElement(_core.ThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_views.Dashboard, _extends({
    solarDesign: solarDesign
  }, callbackProps))));
};

var _default = AdvancedDesignCore;
exports.default = _default;