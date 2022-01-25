import Konva from 'konva';
import { SolarType } from '../../models/Solar.type';
export declare type ShapeElementType = 'polygon' | 'circle';
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
export interface ShapeElementParams extends ShapeParams {
    draggable?: boolean;
    onClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void;
    onDragEnd?: (e: any) => void;
    onDragMove?: (e: Konva.KonvaEventObject<DragEvent>) => void;
    onDragStart?: (e: any) => void;
    onCircleTransformStart?: () => void;
    onCircleTransformEnd?: (e: any) => void;
    onPolygonTransformStart?: () => void;
    onPolygonTransformEnd?: (e: any) => void;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
    opacity?: number;
    id: string;
    name?: string;
    solarType: SolarType;
}
