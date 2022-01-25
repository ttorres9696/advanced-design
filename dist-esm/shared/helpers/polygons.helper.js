"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfThereIsProximity = exports.haveIntersection = exports.checkIfIsInside = exports.getContainer = exports.addNewPoint = exports.getClosestPoint = exports.checkIfIsBetween = exports.getTransformedPointsByRotationInRadians = exports.getRotatedPoints = exports.getPolygonCentroid = exports.convertLinePointsToShapePoints = exports.convertContainerToPoints = exports.lockedTypes = exports.availableTypesForResizing = exports.availableTypesForEditing = void 0;

var _vectors = require("./vectors.helper");

var availableTypesForEditing = [];
exports.availableTypesForEditing = availableTypesForEditing;
var availableTypesForResizing = [];
exports.availableTypesForResizing = availableTypesForResizing;
var lockedTypes = ['roof_plane', 'obstruction', 'tree', 'setback'];
exports.lockedTypes = lockedTypes;

var convertContainerToPoints = function convertContainerToPoints(container) {
  return [[container.lowestX, container.lowestY], [container.lowestX, container.highestY], [container.highestX, container.highestY], [container.highestX, container.lowestY]];
};

exports.convertContainerToPoints = convertContainerToPoints;

var convertLinePointsToShapePoints = function convertLinePointsToShapePoints(linePoints) {
  return linePoints.reduce(function (result, coord, index, linePoints) {
    if (index % 2 === 0) {
      return result.concat([[coord, linePoints[index + 1]]]);
    }

    return result;
  }, []);
};
/**
 * GET THE POLYGON CENTROID
 * @param points
 */


exports.convertLinePointsToShapePoints = convertLinePointsToShapePoints;

var getPolygonCentroid = function getPolygonCentroid(points) {
  var firstPoint = points[0];
  var lastPoint = points[points.length - 1]; // check it the last point is equal the first, if not add the first point a the end of points array

  if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
    points.push(firstPoint);
  }

  var twiceArea = 0;
  var x = 0;
  var y = 0;
  var pointsLength = points.length;
  var pointA;
  var pointB;
  var f;

  for (var i = 0, j = pointsLength - 1; i < pointsLength; j = i++) {
    pointA = points[i];
    pointB = points[j];
    f = pointA[0] * pointB[1] - pointB[0] * pointA[1];
    twiceArea += f;
    x += (pointA[0] + pointB[0]) * f;
    y += (pointA[1] + pointB[1]) * f;
  }

  f = twiceArea * 3;
  return {
    x: x / f,
    y: y / f
  };
};
/**
 * GET ROTATED POINTS
 * @param rotation
 * @param points
 */


exports.getPolygonCentroid = getPolygonCentroid;

var getRotatedPoints = function getRotatedPoints(rotation, points) {
  var centroid = getPolygonCentroid(points);
  return points.map(function (point) {
    return (0, _vectors.convertVector2dToPoint)((0, _vectors.getPointPositionAfterRotation)(point, centroid, rotation));
  });
};

exports.getRotatedPoints = getRotatedPoints;

var getTransformedPointsByRotationInRadians = function getTransformedPointsByRotationInRadians(pointsRotationInRadians, points) {
  var centroid = getPolygonCentroid(points);
  return points.map(function (point, index) {
    return (0, _vectors.convertVector2dToPoint)((0, _vectors.transformPointByRotationInRadians)(point, centroid, pointsRotationInRadians[index]));
  });
};
/**
 * CHECK IF A PIVOT IS BETWEEN TWO POINTS
 * @param currentPoint
 * @param nextPoint
 * @param pivot
 */


exports.getTransformedPointsByRotationInRadians = getTransformedPointsByRotationInRadians;

var checkIfIsBetween = function checkIfIsBetween(currentPoint, nextPoint, pivot) {
  return [currentPoint, nextPoint, {
    x: currentPoint.x,
    y: nextPoint.y
  }, {
    x: nextPoint.x,
    y: currentPoint.y
  }].sort(function (a, b) {
    if (a.x <= b.x && a.y <= b.y) {
      return -1;
    } else if (a.x > b.x && a.y > b.y) {
      return 1;
    }

    return 0;
  }).reduce(function (result, point, index, points) {
    if (index === 0) {
      var largestPoint = points[3];
      return pivot.x >= point.x && pivot.y >= point.y && pivot.x <= largestPoint.x && pivot.y <= largestPoint.y;
    }

    return result;
  }, false);
};
/**
 * GET THE CLOSEST POINT TO PIVOT
 * @param points
 * @param pivot
 */


exports.checkIfIsBetween = checkIfIsBetween;

var getClosestPoint = function getClosestPoint(points, pivot) {
  return points.reduce(function (closestPoint, point, pointIndex) {
    var distance = (0, _vectors.getDistance)({
      x: point[0],
      y: point[1]
    }, {
      x: pivot.x,
      y: pivot.y
    });

    if (closestPoint.index === -1 || distance < closestPoint.distance) {
      closestPoint = {
        index: pointIndex,
        distance: distance,
        x: point[0],
        y: point[1]
      };
    }

    return closestPoint;
  }, {
    index: -1,
    distance: 0,
    x: 0,
    y: 0
  });
};
/**
 * ADD NEW POINT
 * @param currentPoints
 * @param newPoint
 *
 * 1- create a rectangle for each 2-points combination to check if the new point is between them
 * 2- if so, the new point will be inserted between them
 * 3- otherwise, find the closest point, detect in which side the new draggable point will be and insert it
 */


exports.getClosestPoint = getClosestPoint;

var addNewPoint = function addNewPoint(currentPoints, newPoint) {
  var pointsWithNewOne = currentPoints.reduce(function (points, point, index) {
    var nextPoint;

    if (index < currentPoints.length - 1) {
      nextPoint = currentPoints[index + 1];
    } else {
      nextPoint = currentPoints[0];
    }

    points = points.concat([point]); // check if new point wasn't already added before

    if (index === points.length - 1) {
      // create a 4-side figure to check if the new point is between them
      var isBetween = checkIfIsBetween((0, _vectors.convertPointToVector2d)(point), (0, _vectors.convertPointToVector2d)(nextPoint), (0, _vectors.convertShapeCoordsToVector2d)(newPoint));

      if (isBetween) {
        points = points.concat([[newPoint.x, newPoint.y]]);
      }
    }

    return points;
  }, []); // check if the new point was added

  if (pointsWithNewOne.length === currentPoints.length) {
    // if not, instead of try to check if the new point is between two other -> get the closest one, detect if it is on left or right and insert in the array
    var closestPoint = getClosestPoint(pointsWithNewOne, (0, _vectors.convertShapeCoordsToVector2d)(newPoint));

    if (newPoint.x <= closestPoint.x) {
      // if the new point is on left of the closes point, insert the new point before the closest
      pointsWithNewOne.splice(closestPoint.index, 0, [newPoint.x, newPoint.y]);
    } else {
      pointsWithNewOne.splice(closestPoint.index + 1, 0, [newPoint.x, newPoint.y]);
    }
  }

  return pointsWithNewOne;
};

exports.addNewPoint = addNewPoint;

var getContainer = function getContainer(points) {
  var highestX;
  var lowestX;
  var highestY;
  var lowestY;
  points.forEach(function (point) {
    if (!highestX || point[0] > highestX) {
      highestX = point[0];
    }

    if (!lowestX || point[0] < lowestX) {
      lowestX = point[0];
    }

    if (!highestY || point[1] > highestY) {
      highestY = point[1];
    }

    if (!lowestY || point[1] < lowestY) {
      lowestY = point[1];
    }
  });
  return {
    highestX: highestX,
    lowestX: lowestX,
    highestY: highestY,
    lowestY: lowestY
  };
};

exports.getContainer = getContainer;

var checkIfIsInside = function checkIfIsInside(vector, elementPoints) {
  var highestX = elementPoints[2][0];
  var lowestX = elementPoints[0][0];
  var highestY = elementPoints[2][1];
  var lowestY = elementPoints[0][1];
  return vector.x >= lowestX && vector.x <= highestX && vector.y >= lowestY && vector.y <= highestY;
};

exports.checkIfIsInside = checkIfIsInside;

var haveIntersection = function haveIntersection(pointsA, pointsB) {
  return pointsA.filter(function (point) {
    return checkIfIsInside((0, _vectors.convertPointToVector2d)(point), pointsB);
  }).length > 0;
};

exports.haveIntersection = haveIntersection;

var checkIfThereIsProximity = function checkIfThereIsProximity(pointsA, pointsB) {
  var containerA = getContainer(pointsA);
  var containerB = getContainer(pointsB);
  return haveIntersection(convertContainerToPoints(containerA), convertContainerToPoints(containerB));
};

exports.checkIfThereIsProximity = checkIfThereIsProximity;