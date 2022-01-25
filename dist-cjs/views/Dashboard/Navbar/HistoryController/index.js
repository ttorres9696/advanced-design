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

var _actions = require("../../../../redux/stage/actions");

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var HistoryController = function HistoryController() {
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var historyLength = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].history.length : 0;
  });
  var activeHistoryIndex = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].activeHistoryIndex : -1;
  });
  var onUndoHistoryClick = (0, _react.useCallback)(function () {
    return dispatch((0, _actions.undoHistory)());
  }, [dispatch]);
  var onRedoHistoryClick = (0, _react.useCallback)(function () {
    return dispatch((0, _actions.redoHistory)());
  }, [dispatch]);
  return /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.controller
  }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    color: "inherit",
    "aria-label": "undo-history",
    onClick: onUndoHistoryClick,
    disabled: activeHistoryIndex < 0
  }, /*#__PURE__*/_react.default.createElement(_icons.Undo, null)), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    color: "inherit",
    "aria-label": "redo-history",
    onClick: onRedoHistoryClick,
    disabled: activeHistoryIndex >= historyLength - 1
  }, /*#__PURE__*/_react.default.createElement(_icons.Redo, null)));
};

var _default = /*#__PURE__*/_react.default.memo(HistoryController);

exports.default = _default;