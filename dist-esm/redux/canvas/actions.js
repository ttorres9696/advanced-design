"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSelectMode = exports.setDragging = exports.toggleMagnetMode = exports.setMousePosition = exports.setDeleteDraggablePointMode = exports.setNewDraggablePointMode = exports.decrementTotalShapes = exports.incrementTotalShapes = exports.setCanvasOrigin = exports.normalizeZoom = exports.decreaseZoom = exports.increaseZoom = exports.deselectShape = exports.selectShape = void 0;

var _types = require("./types");

var selectShape = function selectShape(solarElementId, layer, selectionType) {
  return {
    type: _types.SELECT_SHAPE,
    payload: {
      solarElementId: solarElementId,
      layer: layer,
      selectionType: selectionType
    }
  };
};

exports.selectShape = selectShape;

var deselectShape = function deselectShape(solarElementId) {
  return {
    type: _types.DESELECT_SHAPE,
    payload: {
      solarElementId: solarElementId
    }
  };
};

exports.deselectShape = deselectShape;

var increaseZoom = function increaseZoom() {
  return {
    type: _types.INCREASE_ZOOM
  };
};

exports.increaseZoom = increaseZoom;

var decreaseZoom = function decreaseZoom() {
  return {
    type: _types.DECREASE_ZOOM
  };
};

exports.decreaseZoom = decreaseZoom;

var normalizeZoom = function normalizeZoom() {
  return {
    type: _types.NORMALIZE_ZOOM
  };
};

exports.normalizeZoom = normalizeZoom;

var setCanvasOrigin = function setCanvasOrigin(canvasCoords) {
  return {
    type: _types.SET_CANVAS_ORIGIN,
    payload: canvasCoords
  };
};

exports.setCanvasOrigin = setCanvasOrigin;

var incrementTotalShapes = function incrementTotalShapes() {
  return {
    type: _types.INCREMENT_TOTAL_SHAPES
  };
};

exports.incrementTotalShapes = incrementTotalShapes;

var decrementTotalShapes = function decrementTotalShapes(count) {
  return {
    type: _types.DECREMENT_TOTAL_SHAPES,
    payload: count || 1
  };
};

exports.decrementTotalShapes = decrementTotalShapes;

var setNewDraggablePointMode = function setNewDraggablePointMode(mode) {
  return {
    type: _types.SET_NEW_DRAGGABLE_POINT_MODE,
    payload: mode
  };
};

exports.setNewDraggablePointMode = setNewDraggablePointMode;

var setDeleteDraggablePointMode = function setDeleteDraggablePointMode(mode) {
  return {
    type: _types.SET_DELETE_DRAGGABLE_POINT_MODE,
    payload: mode
  };
};

exports.setDeleteDraggablePointMode = setDeleteDraggablePointMode;

var setMousePosition = function setMousePosition(mousePosition) {
  return {
    type: _types.SET_MOUSE_POSITION,
    payload: mousePosition
  };
};

exports.setMousePosition = setMousePosition;

var toggleMagnetMode = function toggleMagnetMode() {
  return {
    type: _types.TOGGLE_MAGNET_MODE
  };
};

exports.toggleMagnetMode = toggleMagnetMode;

var setDragging = function setDragging(enabled) {
  return {
    type: _types.SET_DRAGGING,
    payload: enabled
  };
};

exports.setDragging = setDragging;

var setSelectMode = function setSelectMode(enabled) {
  return {
    type: _types.SET_SELECT_MODE,
    payload: enabled
  };
};

exports.setSelectMode = setSelectMode;