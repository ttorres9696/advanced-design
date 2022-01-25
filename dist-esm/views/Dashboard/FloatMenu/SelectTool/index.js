"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clsx4 = _interopRequireDefault(require("clsx"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../redux/canvas/actions");

var _styles = _interopRequireDefault(require("./styles"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectTool = function SelectTool() {
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var selectModeEnabled = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectMode;
  });
  var handleSelectButtonClick = (0, _react.useCallback)(function () {
    dispatch((0, _actions.setSelectMode)(!selectModeEnabled));
  }, [dispatch, selectModeEnabled]);
  return /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: (0, _clsx4.default)(classes.button, _defineProperty({}, classes.selected, selectModeEnabled)),
    onClick: handleSelectButtonClick
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: classes.iconGroup
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: (0, _clsx4.default)(classes.boxIcon, _defineProperty({}, classes.iconSelectedMode, selectModeEnabled))
  }), /*#__PURE__*/_react.default.createElement("i", {
    className: (0, _clsx4.default)(classes.cursorIcon, _defineProperty({}, classes.iconSelectedMode, selectModeEnabled))
  })), "SELECT");
};

var _default = /*#__PURE__*/_react.default.memo(SelectTool);

exports.default = _default;