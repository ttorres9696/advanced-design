import { Vector2d } from 'konva/types/types';
import { ShapeCoords } from '../components/ShapeElement/types';
import { Container } from '../models/Container.interface';
import { SolarType } from '../models/Solar.type';
export declare const availableTypesForEditing: SolarType[];
export declare const availableTypesForResizing: SolarType[];
export declare const lockedTypes: SolarType[];
export declare const convertContainerToPoints: (container: Container) => number[][];
export declare const convertLinePointsToShapePoints: (linePoints: number[]) => number[][];
/**
 * GET THE POLYGON CENTROID
 * @param points
 */
export declare const getPolygonCentroid: (points: number[][]) => Vector2d;
/**
 * GET ROTATED POINTS
 * @param rotation
 * @param points
 */
export declare const getRotatedPoints: (rotation: number, points: number[][]) => number[][];
export declare const getTransformedPointsByRotationInRadians: (pointsRotationInRadians: number[], points: number[][]) => number[][];
/**
 * CHECK IF A PIVOT IS BETWEEN TWO POINTS
 * @param currentPoint
 * @param nextPoint
 * @param pivot
 */
export declare const checkIfIsBetween: (currentPoint: Vector2d, nextPoint: Vector2d, pivot: Vector2d) => boolean;
/**
 * GET THE CLOSEST POINT TO PIVOT
 * @param points
 * @param pivot
 */
export declare const getClosestPoint: (points: number[][], pivot: Vector2d) => {
    index: number;
    distance: number;
    x: number;
    y: number;
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
export declare const addNewPoint: (currentPoints: number[][], newPoint: ShapeCoords) => number[][];
export declare const getContainer: (points: number[][]) => Container;
export declare const checkIfIsInside: (vector: Vector2d, elementPoints: number[][]) => boolean;
export declare const haveIntersection: (pointsA: number[][], pointsB: number[][]) => boolean;
export declare const checkIfThereIsProximity: (pointsA: number[][], pointsB: number[][]) => boolean;
