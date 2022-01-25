"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPointPositionAfterRotation = exports.transformPointByRotationInRadians = exports.getDistance = exports.convertShapeCoordsToVector2d = exports.convertPointToVector2d = exports.convertVector2dToPoint = void 0;

var convertVector2dToPoint = function convertVector2dToPoint(vector2d) {
  return [vector2d.x, vector2d.y];
};

exports.convertVector2dToPoint = convertVector2dToPoint;

var convertPointToVector2d = function convertPointToVector2d(point) {
  return {
    x: point[0],
    y: point[1]
  };
};

exports.convertPointToVector2d = convertPointToVector2d;

var convertShapeCoordsToVector2d = function convertShapeCoordsToVector2d(shapeCoords) {
  return {
    x: shapeCoords.x ? shapeCoords.x : 0,
    y: shapeCoords.y ? shapeCoords.y : 0
  };
};

exports.convertShapeCoordsToVector2d = convertShapeCoordsToVector2d;

var getDistance = function getDistance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointB.y - pointA.y, 2));
};

exports.getDistance = getDistance;

var transformPointByRotationInRadians = function transformPointByRotationInRadians(point, centroid, rotation) {
  var distance = getDistance(centroid, convertPointToVector2d(point));
  return {
    x: centroid.x + distance * Math.cos(rotation),
    y: centroid.y + distance * Math.sin(rotation)
  };
};

exports.transformPointByRotationInRadians = transformPointByRotationInRadians;

var getPointPositionAfterRotation = function getPointPositionAfterRotation(point, centroid, rotation) {
  var originalPoint = convertPointToVector2d(point);
  var distanceCentroidOriginalPoint = getDistance(centroid, originalPoint); // find the angle to the adjusted original point

  var angleBetweenOriginAndAdjustedOriginalPoint = Math.atan2(originalPoint.y - centroid.y, originalPoint.x - centroid.x); // new point angle = rotation plus the adjusted original one

  var newPointAngle = angleBetweenOriginAndAdjustedOriginalPoint + rotation * (Math.PI / 180); // return new point coords

  return {
    x: centroid.x + distanceCentroidOriginalPoint * Math.cos(newPointAngle),
    y: centroid.y + distanceCentroidOriginalPoint * Math.sin(newPointAngle)
  };
};

exports.getPointPositionAfterRotation = getPointPositionAfterRotation;