import Konva from 'konva';
import { Node } from 'konva/types/Node';
import { ReactElement } from 'react';

import { SelectionType } from '../../../redux/canvas/types';
import { ShapeElementType } from '../ShapeElement/types';

export interface UseTansfromableElementProps {
  id: string;
  layer: string;
  onStartChange: (id: string, layer: string) => void;
  onChange: (id: string, layer: string, params: TransformableElementChangeParams) => void;
  onFinishChange: (id: string, layer: string) => void;
  onRotate: (id: string, layer: string, pointsRotationInRadians: number[], points: number[][]) => void;
  setDragging: (dragging: boolean) => void;
  version: number;
  deleteDraggablePointMode: boolean;
  onMoveStart: (layer: string, node: Node) => void;
  onMove: (id: string, layer: string, node: Node, e: Konva.KonvaEventObject<DragEvent>) => void;
  onMoveEnd: (layer: string, node: Node) => void;
  onSelect: (id: string, layer: string, selectionType: SelectionType, node: Node) => void;
  visible: boolean;
  locked: boolean;
  multiple: boolean;
  selectMode: boolean;
}

export interface TransformableElementProps extends UseTansfromableElementProps {
  shapeType: ShapeElementType;
  resizeEnabled?: boolean;
  children?: ReactElement | ReactElement[];
  isSelected: boolean;
  active: boolean;
}

export interface TransformableElementChangeParams {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[][];
  pointsRotationInRadians?: number[];
}

export interface TransformerDimensions {
  width: number;
  height: number;
}
