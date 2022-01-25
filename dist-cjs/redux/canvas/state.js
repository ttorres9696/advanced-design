"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var availableZoomLevels = [15, 30, 45, 50, 75, 90, 100, 120, 140, 150, 175, 190, 200, 220, 240, 250, 275, 300];
var initialState = {
  selectedShapeElementIds: [],
  selectedLayerName: '',
  zoomLevels: availableZoomLevels,
  scaleIndex: availableZoomLevels.indexOf(100),
  scale: 1,
  canvasOrigin: {
    x: 0,
    y: 0
  },
  totalShapes: 0,
  newDraggablePointMode: false,
  deleteDraggablePointMode: false,
  magnetMode: true,
  dragging: false,
  selectMode: false
};
var _default = initialState;
exports.default = _default;