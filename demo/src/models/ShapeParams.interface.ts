export type ShapeElementType = 'polygon' | 'circle';

export interface ShapeCoords {
  x?: number;
  y?: number;
}

export interface ShapeParams extends ShapeCoords {
  version?: number;
  points?: number[][];
  radius?: number;
  type: ShapeElementType;
  visible?: boolean;
  selected?: boolean;
  locked?: boolean;
  center?: number[];
  pointsRotationInRadians?: number[];
}