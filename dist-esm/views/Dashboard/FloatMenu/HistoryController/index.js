"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _RedoButton = _interopRequireDefault(require("./RedoButton"));

var _ResetButton = _interopRequireDefault(require("./ResetButton"));

var _styles = _interopRequireDefault(require("./styles"));

var _UndoButton = _interopRequireDefault(require("./UndoButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HistoryController = function HistoryController() {
  var classes = (0, _styles.default)();
  var historyLength = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].history.length : 0;
  });
  var activeHistoryIndex = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].activeHistoryIndex : -1;
  });
  return /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.controller
  }, /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.buttonGroup
  }, /*#__PURE__*/_react.default.createElement(_UndoButton.default, {
    activeHistoryIndex: activeHistoryIndex
  }), /*#__PURE__*/_react.default.createElement(_RedoButton.default, {
    historyLength: historyLength,
    activeHistoryIndex: activeHistoryIndex
  })), /*#__PURE__*/_react.default.createElement(_ResetButton.default, {
    activeHistoryIndex: activeHistoryIndex
  }));
};

var _default = /*#__PURE__*/_react.default.memo(HistoryController);

exports.default = _default;