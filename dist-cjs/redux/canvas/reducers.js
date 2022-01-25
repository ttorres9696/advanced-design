"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decimal = require("decimal.js");

var _state = _interopRequireDefault(require("./state"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var canvasReducer = function canvasReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _state.default;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    /**
     * STORE THE SELECTED ELEMENT BY USER AND ITS LAYER
     */
    case _types.SELECT_SHAPE:
      if (state.selectedShapeElementIds.length > 0 && action.payload.layer !== state.selectedLayerName && action.payload.selectionType === 'add' || state.selectedShapeElementIds.length === 0 && action.payload.solarElementId.length === 0) {
        return state;
      }

      var newSelectedShapeElementIds = action.payload.solarElementId.length > 0 && [action.payload.solarElementId] || [];

      if (action.payload.selectionType === 'add') {
        newSelectedShapeElementIds = Array.from(state.selectedShapeElementIds).concat(newSelectedShapeElementIds);
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        selectedShapeElementIds: newSelectedShapeElementIds,
        selectedLayerName: action.payload.layer
      });

    case _types.DESELECT_SHAPE:
      return _objectSpread(_objectSpread({}, state), {}, {
        selectedShapeElementIds: Array.from(state.selectedShapeElementIds).filter(function (elementId) {
          return elementId !== action.payload.solarElementId;
        })
      });

    /**
     * INCREASE THE CANVAS ZOOM
     */

    case _types.INCREASE_ZOOM:
      if (state.scaleIndex === state.zoomLevels.length - 1) {
        return state;
      }

      var nextIndex = state.scaleIndex + 1;
      var newIncreasedScale = new _decimal.Decimal(state.zoomLevels[nextIndex]).dividedBy(100);
      return _objectSpread(_objectSpread({}, state), {}, {
        scaleIndex: nextIndex,
        scale: newIncreasedScale.toNumber()
      });

    /**
     * DECREASE THE CANVAS ZOOM
     */

    case _types.DECREASE_ZOOM:
      if (state.scaleIndex === 0) {
        return state;
      }

      var previousIndex = state.scaleIndex - 1;
      var newDecreasedScale = new _decimal.Decimal(state.zoomLevels[previousIndex]).dividedBy(100);
      return _objectSpread(_objectSpread({}, state), {}, {
        scaleIndex: previousIndex,
        scale: newDecreasedScale.toNumber()
      });

    /**
     * REVERT ZOOM TO THE DEFAULT = 100%
     */

    case _types.NORMALIZE_ZOOM:
      return _objectSpread(_objectSpread({}, state), {}, {
        scale: 1
      });

    /**
     * SAVE CANVAS ORIGIN FOR ALL SHAPES
     */

    case _types.SET_CANVAS_ORIGIN:
      return _objectSpread(_objectSpread({}, state), {}, {
        canvasOrigin: action.payload
      });

    /**
     * WHEN A NEW SHAPE IS ADDED, INCREMENT THIS COUNTER
     */

    case _types.INCREMENT_TOTAL_SHAPES:
      return _objectSpread(_objectSpread({}, state), {}, {
        totalShapes: state.totalShapes + 1
      });

    /**
     * WHEN A SHAPE IS DELETED, DECREMENT THIS COUNTER
     */

    case _types.DECREMENT_TOTAL_SHAPES:
      var newTotalShapes = state.totalShapes - action.payload;

      if (newTotalShapes < 0) {
        newTotalShapes = 0;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        totalShapes: newTotalShapes
      });

    /**
     * ACTIVE OR INACTIVE THE NEW DRAGGABLE POINT MODE WHEN USER CLICKS ON ADD/CANCEL BUTTON IN THE RIGHT DRAWER
     */

    case _types.SET_NEW_DRAGGABLE_POINT_MODE:
      return _objectSpread(_objectSpread({}, state), {}, {
        newDraggablePointMode: action.payload
      });

    /**
     * ACTIVE OR INACTIVE THE DELETE DRAGGABLE POINT MODE WHEN USER CLICKS ON REMOVE/CANCEL BUTTON IN THE RIGHT DRAWER
     */

    case _types.SET_DELETE_DRAGGABLE_POINT_MODE:
      return _objectSpread(_objectSpread({}, state), {}, {
        deleteDraggablePointMode: action.payload
      });

    /**
     * SAVE THE MOUSE POSITION THAT WILL BE USED FOR NEW DRAGGABLE POINTS
     */

    case _types.SET_MOUSE_POSITION:
      return _objectSpread(_objectSpread({}, state), {}, {
        mousePosition: action.payload
      });

    /**
     * TOGGLE MAGNET MODE
     */

    case _types.TOGGLE_MAGNET_MODE:
      return _objectSpread(_objectSpread({}, state), {}, {
        magnetMode: !state.magnetMode
      });

    /**
     * SET DRAGGING
     */

    case _types.SET_DRAGGING:
      return _objectSpread(_objectSpread({}, state), {}, {
        dragging: action.payload
      });

    /**
     * SET SELECT MODE
     */

    case _types.SET_SELECT_MODE:
      return _objectSpread(_objectSpread({}, state), {}, {
        selectMode: action.payload
      });

    default:
      return state;
  }
};

var _default = canvasReducer;
exports.default = _default;