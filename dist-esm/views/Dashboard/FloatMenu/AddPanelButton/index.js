"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../redux/canvas/actions");

var _actions2 = require("../../../../redux/stage/actions");

var _modules = require("../../../../shared/helpers/modules.helper");

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AddPanelButton = function AddPanelButton() {
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var totalShapes = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.totalShapes;
  });
  var selectedModuleSpec = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec;
  });
  var selectedLayerName = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedLayerName;
  });
  var selectedShapeElementIds = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedShapeElementIds;
  });
  var handleOnClick = (0, _react.useCallback)(function () {
    if (selectedModuleSpec) {
      var layer = 'modules';
      var points = (0, _modules.getModuleDesignPoints)(selectedModuleSpec);
      var newShape = {
        id: "M".concat(totalShapes + 1),
        shape: {
          points: points,
          pointsRotationInRadians: (0, _modules.getCurrentModulePointsRotation)(points),
          type: 'polygon'
        },
        type: 'module',
        active: true
      };
      dispatch((0, _actions2.startHistoryItem)([newShape.id], layer));
      dispatch((0, _actions2.addShape)(selectedModuleSpec.series, newShape));
      dispatch((0, _actions.incrementTotalShapes)());
      dispatch((0, _actions.setSelectMode)(true));
      selectedShapeElementIds.forEach(function (elementId) {
        dispatch((0, _actions2.setSelectedElement)(selectedLayerName, elementId, false));
      });
      dispatch((0, _actions2.setSelectedElement)(layer, newShape.id, true));
      dispatch((0, _actions.selectShape)(newShape.id, layer, 'reset'));
      dispatch((0, _actions2.setTransformerNodes)('reset', [newShape.id]));
      dispatch((0, _actions2.finishHistoryItem)([newShape.id], layer));
    }
  }, [dispatch, totalShapes, selectedModuleSpec, selectedLayerName, selectedShapeElementIds]);
  return /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: classes.button,
    onClick: handleOnClick
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: classes.icon
  }), "ADD PANEL");
};

var _default = /*#__PURE__*/_react.default.memo(AddPanelButton);

exports.default = _default;