/// <reference types="react" />
import Konva from 'konva';
import { KonvaEventObject, Node } from 'konva/types/Node';
import { Stage } from 'konva/types/Stage';
import { Vector2d } from 'konva/types/types';
import { SelectionType } from '../../../redux/canvas/types';
import { ShapeCoords } from '../../../shared/components/ShapeElement/types';
import { TransformableElementChangeParams } from '../../../shared/components/TransformableElement/types';
import { UseCanvasProps } from './types';
declare const useCanvas: ({ solarDesign, transformerSelectElement, transformerHandleDragElement, transformerOnDragEnd, }: UseCanvasProps) => {
    selectElement: (id: string, layer: string, selectionType: SelectionType, node?: Node<import("konva/types/Node").NodeConfig> | undefined) => void;
    selectedElementIds: string[];
    selectedLayerName: string;
    scale: number;
    canvasOrigin: ShapeCoords;
    onStartChange: (id: string, layer: string) => import("../../../redux/stage/types").StageActionTypes;
    onChangeElementParams: (id: string, layer: string, params: TransformableElementChangeParams) => void;
    onRotateElement: (id: string, layer: string, pointsRotationInRadians: number[], points: number[][]) => import("../../../redux/stage/types").StageActionTypes;
    onFinishChange: (id: string, layer: string) => import("../../../redux/stage/types").StageActionTypes;
    onMoveStart: (layer: string, node: Node) => void;
    onMoveElement: (id: string, layer: string, node: Node, e: Konva.KonvaEventObject<DragEvent>) => void;
    onMoveEnd: (layer: string, node: Node) => void;
    layersOrder: string[];
    layers: {
        trees: import("../../../redux/stage/state").SolarElementsById;
        roofs: import("../../../redux/stage/state").SolarElementsById;
        setbacks: import("../../../redux/stage/state").SolarElementsById;
        modules: import("../../../redux/stage/state").SolarElementsById;
        obstructions: import("../../../redux/stage/state").SolarElementsById;
    };
    newDraggablePointMode: boolean;
    deleteDraggablePointMode: boolean;
    mousePosition: Vector2d | undefined;
    selectMode: boolean;
    onMouseMove: (event: KonvaEventObject<MouseEvent>) => void;
    onMouseClick: (event: KonvaEventObject<MouseEvent>) => void;
    setDragging: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    dragging: boolean;
    stageRef: Stage | null;
    setStageRef: import("react").Dispatch<import("react").SetStateAction<Stage | null>>;
};
export default useCanvas;
