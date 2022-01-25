import { Vector2d } from 'konva/types/types';
import { ShapeCoords } from '../components/ShapeElement/types';
export declare const convertVector2dToPoint: (vector2d: Vector2d) => number[];
export declare const convertPointToVector2d: (point: number[]) => Vector2d;
export declare const convertShapeCoordsToVector2d: (shapeCoords: ShapeCoords) => Vector2d;
export declare const getDistance: (pointA: Vector2d, pointB: Vector2d) => number;
export declare const transformPointByRotationInRadians: (point: number[], centroid: Vector2d, rotation: number) => {
    x: number;
    y: number;
};
export declare const getPointPositionAfterRotation: (point: number[], centroid: Vector2d, rotation: number) => Vector2d;
