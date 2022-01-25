"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareShape = void 0;

var _decimal = require("decimal.js");

var _types = require("../../../redux/stage/types");

var _polygons = require("../../helpers/polygons.helper");

var prepareShape = function prepareShape(shape, elementType) {
  var _shape$points;

  shape = {
    points: (_shape$points = shape.points) === null || _shape$points === void 0 ? void 0 : _shape$points.map(function (point) {
      return [new _decimal.Decimal(point[0]).mul(_types.defaultMultiplierScale).toNumber(), new _decimal.Decimal(point[1]).mul(_types.defaultMultiplierScale).toNumber()];
    }),
    radius: shape.radius ? new _decimal.Decimal(shape.radius).mul(_types.defaultMultiplierScale).toNumber() : 0,
    x: shape.center ? new _decimal.Decimal(shape.center[0]).mul(_types.defaultMultiplierScale).toNumber() : 0,
    y: shape.center ? new _decimal.Decimal(shape.center[1]).mul(_types.defaultMultiplierScale).toNumber() : 0,
    type: shape.type,
    visible: true,
    locked: _polygons.lockedTypes.includes(elementType),
    pointsRotationInRadians: shape.pointsRotationInRadians,
    selected: false
  };
  return shape;
};

exports.prepareShape = prepareShape;