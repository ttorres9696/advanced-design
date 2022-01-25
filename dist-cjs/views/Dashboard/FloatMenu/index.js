"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _DeleteButton = _interopRequireDefault(require("../../../shared/components/DeleteButton"));

var _AddPanelButton = _interopRequireDefault(require("./AddPanelButton"));

var _HistoryController = _interopRequireDefault(require("./HistoryController"));

var _SelectTool = _interopRequireDefault(require("./SelectTool"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloatMenu = function FloatMenu() {
  var classes = (0, _styles.default)();
  return /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.container
  }, /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.menu
  }, /*#__PURE__*/_react.default.createElement(_SelectTool.default, null), /*#__PURE__*/_react.default.createElement(_AddPanelButton.default, null), /*#__PURE__*/_react.default.createElement(_HistoryController.default, null)), /*#__PURE__*/_react.default.createElement(_DeleteButton.default, null));
};

var _default = /*#__PURE__*/_react.default.memo(FloatMenu);

exports.default = _default;