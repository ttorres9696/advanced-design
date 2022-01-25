"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLowerCoords = void 0;

var _decimal = require("decimal.js");

var _types = require("../../redux/canvas/types");

var _types2 = require("../../redux/stage/types");

var getLowerCoords = function getLowerCoords(solarDesign, padding) {
  var initialValue = {
    x: 0,
    y: 0
  };
  var lowerPoints = Object.values(solarDesign.layers).reduce(function (point, layer) {
    return layer.reduce(function (layerPoint, solarElement) {
      if (solarElement.shape.points) {
        return solarElement.shape.points.reduce(function (prev, point) {
          return {
            x: prev.x > point[0] ? point[0] : prev.x,
            y: prev.y > point[1] ? point[1] : prev.y
          };
        }, layerPoint);
      } else {
        return {
          x: layerPoint.x > solarElement.shape.center[0] ? solarElement.shape.center[0] : layerPoint.x,
          y: layerPoint.y > solarElement.shape.center[1] ? solarElement.shape.center[1] : layerPoint.y
        };
      }
    }, point);
  }, initialValue);
  return {
    x: new _decimal.Decimal(Math.abs(lowerPoints.x)).mul(_types2.defaultMultiplierScale).plus(_types.originCoords).plus(padding && padding.left ? padding.left : 0).toNumber(),
    y: new _decimal.Decimal(Math.abs(lowerPoints.y)).mul(_types2.defaultMultiplierScale).plus(_types.originCoords).plus(padding && padding.top ? padding.top : 0).toNumber()
  };
};

exports.getLowerCoords = getLowerCoords;