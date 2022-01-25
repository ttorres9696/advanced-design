import { Vector2d } from 'konva/types/types';

import { ShapeCoords } from '../components/ShapeElement/types';
import { ClosestPoint } from '../models/ClosestPoint.interface';
import { Container } from '../models/Container.interface';
import { SolarType } from '../models/Solar.type';
import {
  convertPointToVector2d,
  convertShapeCoordsToVector2d,
  convertVector2dToPoint,
  getDistance,
  getPointPositionAfterRotation,
  transformPointByRotationInRadians,
} from './vectors.helper';

export const availableTypesForEditing: SolarType[] = [];
export const availableTypesForResizing: SolarType[] = [];
export const lockedTypes: SolarType[] = ['roof_plane', 'obstruction', 'tree', 'setback'];

export const convertContainerToPoints = (container: Container): number[][] => {
  return [
    [container.lowestX, container.lowestY],
    [container.lowestX, container.highestY],
    [container.highestX, container.highestY],
    [container.highestX, container.lowestY],
  ];
};

export const convertLinePointsToShapePoints = (linePoints: number[]): number[][] => {
  return linePoints.reduce((result: number[][], coord: number, index: number, linePoints: number[]) => {
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
export const getPolygonCentroid = (points: number[][]): Vector2d => {
  let firstPoint: number[] = points[0];
  let lastPoint: number[] = points[points.length - 1];

  // check it the last point is equal the first, if not add the first point a the end of points array
  if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
    points.push(firstPoint);
  }

  let twiceArea: number = 0;
  let x: number = 0;
  let y: number = 0;
  let pointsLength: number = points.length;

  let pointA: number[];
  let pointB: number[];

  let f: number;
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
    y: y / f,
  };
};

/**
 * GET ROTATED POINTS
 * @param rotation
 * @param points
 */
export const getRotatedPoints = (rotation: number, points: number[][]): number[][] => {
  const centroid: Vector2d = getPolygonCentroid(points);

  return points.map((point: number[]) =>
    convertVector2dToPoint(getPointPositionAfterRotation(point, centroid, rotation)),
  );
};

export const getTransformedPointsByRotationInRadians = (
  pointsRotationInRadians: number[],
  points: number[][],
): number[][] => {
  const centroid: Vector2d = getPolygonCentroid(points);

  return points.map((point: number[], index: number) =>
    convertVector2dToPoint(transformPointByRotationInRadians(point, centroid, pointsRotationInRadians[index])),
  );
};

/**
 * CHECK IF A PIVOT IS BETWEEN TWO POINTS
 * @param currentPoint
 * @param nextPoint
 * @param pivot
 */
export const checkIfIsBetween = (currentPoint: Vector2d, nextPoint: Vector2d, pivot: Vector2d) => {
  return [currentPoint, nextPoint, { x: currentPoint.x, y: nextPoint.y }, { x: nextPoint.x, y: currentPoint.y }]
    .sort((a: Vector2d, b: Vector2d) => {
      if (a.x <= b.x && a.y <= b.y) {
        return -1;
      } else if (a.x > b.x && a.y > b.y) {
        return 1;
      }
      return 0;
    })
    .reduce((result: boolean, point: Vector2d, index: number, points: Vector2d[]) => {
      if (index === 0) {
        const largestPoint: Vector2d = points[3];

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
export const getClosestPoint = (points: number[][], pivot: Vector2d) => {
  return points.reduce(
    (closestPoint: ClosestPoint, point: number[], pointIndex: number) => {
      const distance = getDistance(
        {
          x: point[0],
          y: point[1],
        },
        {
          x: pivot.x,
          y: pivot.y,
        },
      );

      if (closestPoint.index === -1 || distance < closestPoint.distance) {
        closestPoint = {
          index: pointIndex,
          distance,
          x: point[0],
          y: point[1],
        };
      }

      return closestPoint;
    },
    {
      index: -1,
      distance: 0,
      x: 0,
      y: 0,
    },
  );
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
export const addNewPoint = (currentPoints: number[][], newPoint: ShapeCoords): number[][] => {
  let pointsWithNewOne: number[][] = currentPoints.reduce((points: number[][], point: number[], index: number) => {
    let nextPoint: number[];
    if (index < currentPoints.length - 1) {
      nextPoint = currentPoints[index + 1];
    } else {
      nextPoint = currentPoints[0];
    }

    points = points.concat([point]);

    // check if new point wasn't already added before
    if (index === points.length - 1) {
      // create a 4-side figure to check if the new point is between them
      const isBetween: boolean = checkIfIsBetween(
        convertPointToVector2d(point),
        convertPointToVector2d(nextPoint),
        convertShapeCoordsToVector2d(newPoint),
      );

      if (isBetween) {
        points = points.concat([[newPoint.x!, newPoint.y!]]);
      }
    }

    return points;
  }, []);

  // check if the new point was added
  if (pointsWithNewOne.length === currentPoints.length) {
    // if not, instead of try to check if the new point is between two other -> get the closest one, detect if it is on left or right and insert in the array
    const closestPoint: ClosestPoint = getClosestPoint(pointsWithNewOne, convertShapeCoordsToVector2d(newPoint));

    if (newPoint.x! <= closestPoint.x) {
      // if the new point is on left of the closes point, insert the new point before the closest
      pointsWithNewOne.splice(closestPoint.index, 0, [newPoint.x!, newPoint.y!]);
    } else {
      pointsWithNewOne.splice(closestPoint.index + 1, 0, [newPoint.x!, newPoint.y!]);
    }
  }

  return pointsWithNewOne;
};

export const getContainer = (points: number[][]): Container => {
  let highestX: number;
  let lowestX: number;
  let highestY: number;
  let lowestY: number;

  points.forEach((point: number[]) => {
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
    highestX: highestX!,
    lowestX: lowestX!,
    highestY: highestY!,
    lowestY: lowestY!,
  };
};

export const checkIfIsInside = (vector: Vector2d, elementPoints: number[][]): boolean => {
  const highestX = elementPoints[2][0];
  const lowestX = elementPoints[0][0];
  const highestY = elementPoints[2][1];
  const lowestY = elementPoints[0][1];

  return vector.x >= lowestX && vector.x <= highestX && vector.y >= lowestY && vector.y <= highestY;
};

export const haveIntersection = (pointsA: number[][], pointsB: number[][]): boolean => {
  return pointsA.filter(point => checkIfIsInside(convertPointToVector2d(point), pointsB)).length > 0;
};

export const checkIfThereIsProximity = (pointsA: number[][], pointsB: number[][]): boolean => {
  const containerA: Container = getContainer(pointsA);
  const containerB: Container = getContainer(pointsB);

  return haveIntersection(convertContainerToPoints(containerA), convertContainerToPoints(containerB));
};
