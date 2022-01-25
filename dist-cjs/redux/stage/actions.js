"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleModule = exports.clearTransformerNodesState = exports.setTransformerNodes = exports.setSelectedModuleSpec = exports.setSelectedElement = exports.removeDraggablePoint = exports.addNewDraggablePoint = exports.finishHistoryItem = exports.startHistoryItem = exports.resetHistory = exports.redoHistory = exports.undoHistory = exports.importData = exports.toggleLock = exports.toggleVisibility = exports.removeShapes = exports.updateShape = exports.addShape = void 0;

var _types = require("./types");

var addShape = function addShape(moduleSeries, newShape) {
  return {
    type: _types.ADD_SHAPE,
    payload: {
      moduleSeries: moduleSeries,
      element: newShape
    }
  };
};

exports.addShape = addShape;

var updateShape = function updateShape(shape) {
  return {
    type: _types.UPDATE_SHAPE,
    payload: shape
  };
};

exports.updateShape = updateShape;

var removeShapes = function removeShapes(layer, elementIds) {
  return {
    type: _types.REMOVE_SHAPE,
    payload: {
      layer: layer,
      elementIds: elementIds
    }
  };
};

exports.removeShapes = removeShapes;

var toggleVisibility = function toggleVisibility(reference) {
  return {
    type: _types.TOGGLE_VISIBILITY,
    payload: reference
  };
};

exports.toggleVisibility = toggleVisibility;

var toggleLock = function toggleLock(reference) {
  return {
    type: _types.TOGGLE_LOCK,
    payload: reference
  };
};

exports.toggleLock = toggleLock;

var importData = function importData(design) {
  return {
    type: _types.IMPORT_DATA,
    payload: design
  };
};

exports.importData = importData;

var undoHistory = function undoHistory() {
  return {
    type: _types.UNDO_HISTORY
  };
};

exports.undoHistory = undoHistory;

var redoHistory = function redoHistory() {
  return {
    type: _types.REDO_HISTORY
  };
};

exports.redoHistory = redoHistory;

var resetHistory = function resetHistory() {
  return {
    type: _types.RESET_HISTORY
  };
};

exports.resetHistory = resetHistory;

var startHistoryItem = function startHistoryItem(ids, layer) {
  return {
    type: _types.START_HISTORY_ITEM,
    payload: {
      ids: ids,
      layer: layer
    }
  };
};

exports.startHistoryItem = startHistoryItem;

var finishHistoryItem = function finishHistoryItem(ids, layer) {
  return {
    type: _types.FINISH_HISTORY_ITEM,
    payload: {
      ids: ids,
      layer: layer
    }
  };
};

exports.finishHistoryItem = finishHistoryItem;

var addNewDraggablePoint = function addNewDraggablePoint(layer, elementId, newPoint) {
  return {
    type: _types.ADD_NEW_DRAGGABLE_POINT,
    payload: {
      layer: layer,
      elementId: elementId,
      newPoint: newPoint
    }
  };
};

exports.addNewDraggablePoint = addNewDraggablePoint;

var removeDraggablePoint = function removeDraggablePoint(layer, elementId, pointIndex) {
  return {
    type: _types.REMOVE_DRAGGABLE_POINT,
    payload: {
      layer: layer,
      elementId: elementId,
      pointIndex: pointIndex
    }
  };
};

exports.removeDraggablePoint = removeDraggablePoint;

var setSelectedElement = function setSelectedElement(layer, elementId, selected) {
  return {
    type: _types.SET_SELECTED_ELEMENT,
    payload: {
      layer: layer,
      elementId: elementId,
      selected: selected
    }
  };
};

exports.setSelectedElement = setSelectedElement;

var setSelectedModuleSpec = function setSelectedModuleSpec(moduleSpec) {
  return {
    type: _types.SET_SELECTED_MODULE_SPEC,
    payload: moduleSpec
  };
};

exports.setSelectedModuleSpec = setSelectedModuleSpec;

var setTransformerNodes = function setTransformerNodes(selectionType, elementIds) {
  return {
    type: _types.SET_TRANSFORMER_NODES,
    payload: {
      selectionType: selectionType,
      elementIds: elementIds
    }
  };
};

exports.setTransformerNodes = setTransformerNodes;

var clearTransformerNodesState = function clearTransformerNodesState() {
  return {
    type: _types.CLEAR_TRANSFORMER_NODES_STATE
  };
};

exports.clearTransformerNodesState = clearTransformerNodesState;

var toggleModule = function toggleModule(elementId) {
  return {
    type: _types.TOGGLE_MODULE,
    payload: {
      elementId: elementId
    }
  };
};

exports.toggleModule = toggleModule;