"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMagnetAlignment = exports.getCurrentModulePointsRotation = exports.getModuleDesignPoints = void 0;

var _polygons = require("./polygons.helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getModuleDesignPoints = function getModuleDesignPoints(moduleSpec) {
  var width = moduleSpec.size[0] - moduleSpec.spacing[0];
  var height = moduleSpec.size[1] - moduleSpec.spacing[1];
  return [[0, 0], [0, height], [width, height], [width, 0]];
};

exports.getModuleDesignPoints = getModuleDesignPoints;

var getCurrentModulePointsRotation = function getCurrentModulePointsRotation(points) {
  var centroid = (0, _polygons.getPolygonCentroid)(points);
  return points.map(function (point) {
    return Math.atan2(point[1] - centroid.y, point[0] - centroid.x);
  });
};

exports.getCurrentModulePointsRotation = getCurrentModulePointsRotation;

var getMagnetAlignment = function getMagnetAlignment(pivot, modules, selectedElementIds) {
  var moduleInIntersection = modules.find(function (module) {
    return module.id !== pivot.id && (0, _polygons.checkIfThereIsProximity)(pivot.shape.points, module.shape.points) && !(selectedElementIds.includes(module.id) && selectedElementIds.includes(pivot.id));
  });

  if (!moduleInIntersection) {
    return;
  }

  return _objectSpread(_objectSpread({}, pivot.shape), {}, {
    pointsRotationInRadians: moduleInIntersection.shape.pointsRotationInRadians,
    points: (0, _polygons.getTransformedPointsByRotationInRadians)(moduleInIntersection.shape.pointsRotationInRadians, pivot.shape.points)
  });
};

exports.getMagnetAlignment = getMagnetAlignment;