/// <reference types="react" />
import Konva from 'konva';
import { DraggablePointParams } from './DraggablePoint/types';
import { UseTansfromableElementProps } from './types';
declare const useTransformableElement: ({ id, layer, onStartChange, onChange, onFinishChange, onRotate, setDragging, version, deleteDraggablePointMode, onMoveStart, onMove, onMoveEnd, onSelect, visible, locked, selectMode, }: UseTansfromableElementProps) => {
    shapeRef: import("react").MutableRefObject<any>;
    onDragStart: (e: any) => void;
    onDragMove: (e: any) => void;
    onDragEnd: (e: any) => void;
    onCircleTransformStart: () => void;
    onCircleTransformEnd: (e: any) => void;
    onPolygonTransformStart: () => void;
    onPolygonTransformEnd: (e: any) => void;
    onPolygonChangePointStart: () => void;
    onPolygonChangePoint: (x: number, y: number, position: number) => void;
    onPolygonChangePointEnd: (x: number, y: number, position: number) => void;
    onPolygonClickPoint: (position: number) => void;
    draggablePoints: DraggablePointParams[];
    inDragMode: boolean;
    handleOnClickElement: (e: Konva.KonvaEventObject<MouseEvent>) => void;
    onMouseEnter: (e: any) => void;
    onMouseLeave: (e: any) => void;
};
export default useTransformableElement;
