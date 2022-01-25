"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _clsx2 = _interopRequireDefault(require("clsx"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../redux/canvas/actions");

var _styles = _interopRequireDefault(require("./styles"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MagnetModeCheckbox = function MagnetModeCheckbox(_ref) {
  var mode = _ref.mode;
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var magnetMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.magnetMode;
  });
  var onChange = (0, _react.useCallback)(function () {
    return dispatch((0, _actions.toggleMagnetMode)());
  }, [dispatch]);
  return /*#__PURE__*/_react.default.createElement(_core.Paper, {
    className: classes.paper
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center",
    wrap: "nowrap"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    className: (0, _clsx2.default)(classes.checkboxContainer, _defineProperty({}, classes.checkboxContainerBorderRight, mode === 'full'))
  }, /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
    checked: magnetMode,
    onChange: onChange,
    color: "default",
    className: classes.checkbox
  })), mode === 'full' ? /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: true,
    className: classes.labelContainer,
    onClick: onChange
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline"
  }, "Magnet Mode")) : null));
};

var _default = /*#__PURE__*/_react.default.memo(MagnetModeCheckbox);

exports.default = _default;