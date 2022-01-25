"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapShape = exports.getLayerZIndex = exports.getRespectiveLayerSolarType = exports.getSolarTypeLayer = void 0;

var _helpers = require("../../shared/components/ShapeElement/helpers");

var getSolarTypeLayer = function getSolarTypeLayer(type) {
  switch (type) {
    case 'roof_plane':
      return 'roofs';

    case 'module':
    case 'obstruction':
    case 'tree':
    case 'setback':
      return "".concat(type, "s");

    default:
      return '';
  }
};

exports.getSolarTypeLayer = getSolarTypeLayer;

var getRespectiveLayerSolarType = function getRespectiveLayerSolarType(layerName) {
  switch (layerName) {
    case 'roofs':
      return 'roof_plane';

    case 'modules':
    case 'obstructions':
    case 'trees':
    case 'setbacks':
    default:
      return layerName.slice(0, -1);
  }
};

exports.getRespectiveLayerSolarType = getRespectiveLayerSolarType;

var getLayerZIndex = function getLayerZIndex(type) {
  switch (type) {
    case 'tree':
      return 1;

    case 'roof_plane':
      return 2;

    case 'setback':
      return 3;

    case 'module':
      return 4;

    case 'obstruction':
    default:
      return 5;
  }
};

exports.getLayerZIndex = getLayerZIndex;

var mapShape = function mapShape(solarElement) {
  solarElement.shape = (0, _helpers.prepareShape)(solarElement.shape, solarElement.type);
  return solarElement;
};

exports.mapShape = mapShape;