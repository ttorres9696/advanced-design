import { Vector2d } from 'konva/types/types';

import { ShapeCoords } from '../components/ShapeElement/types';

export const convertVector2dToPoint = (vector2d: Vector2d): number[] => {
  return [vector2d.x, vector2d.y];
};

export const convertPointToVector2d = (point: number[]): Vector2d => {
  return {
    x: point[0],
    y: point[1],
  };
};

export const convertShapeCoordsToVector2d = (shapeCoords: ShapeCoords): Vector2d => {
  return {
    x: shapeCoords.x ? shapeCoords.x : 0,
    y: shapeCoords.y ? shapeCoords.y : 0,
  };
};

export const getDistance = (pointA: Vector2d, pointB: Vector2d): number => {
  return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointB.y - pointA.y, 2));
};

export const transformPointByRotationInRadians = (point: number[], centroid: Vector2d, rotation: number) => {
  const distance = getDistance(centroid, convertPointToVector2d(point));
  return {
    x: centroid.x + distance * Math.cos(rotation),
    y: centroid.y + distance * Math.sin(rotation),
  };
};

export const getPointPositionAfterRotation = (point: number[], centroid: Vector2d, rotation: number): Vector2d => {
  const originalPoint: Vector2d = convertPointToVector2d(point);

  const distanceCentroidOriginalPoint = getDistance(centroid, originalPoint);

  // find the angle to the adjusted original point
  const angleBetweenOriginAndAdjustedOriginalPoint = Math.atan2(
    originalPoint.y - centroid.y,
    originalPoint.x - centroid.x,
  );

  // new point angle = rotation plus the adjusted original one
  const newPointAngle = angleBetweenOriginAndAdjustedOriginalPoint + rotation * (Math.PI / 180);

  // return new point coords
  return {
    x: centroid.x + distanceCentroidOriginalPoint * Math.cos(newPointAngle),
    y: centroid.y + distanceCentroidOriginalPoint * Math.sin(newPointAngle),
  };
};
