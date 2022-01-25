import { Vector2d } from 'konva/types/types';
import { ShapeCoords } from '../../shared/components/ShapeElement/types';
export interface CanvasState {
    selectedShapeElementIds: string[];
    selectedLayerName: string;
    zoomLevels: number[];
    scaleIndex: number;
    scale: number;
    canvasOrigin: ShapeCoords;
    totalShapes: number;
    newDraggablePointMode: boolean;
    deleteDraggablePointMode: boolean;
    mousePosition?: Vector2d;
    magnetMode: boolean;
    dragging: boolean;
    selectMode: boolean;
}
declare const initialState: CanvasState;
export default initialState;
