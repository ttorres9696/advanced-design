import Konva from 'konva';
import { Node } from 'konva/types/Node';

import { SelectionType } from '../../../redux/canvas/types';
import { SolarDesign } from '../../../shared/models/SolarDesign.interface';

export interface CanvasProps {
  solarDesign: SolarDesign;
  canvasDimension: CanvasDimension;
}

export interface CanvasMargin {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

export interface CanvasDimension {
  width: number;
  height: number;
}

export interface UseCanvasProps {
  solarDesign: SolarDesign;
  transformerSelectElement: (selectionType: SelectionType, node?: Node) => void;
  transformerHandleDragElement: (node: Node, e: Konva.KonvaEventObject<DragEvent>) => void;
  transformerOnDragEnd: (layer: string, node: Node) => string[];
}
