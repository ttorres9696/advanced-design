import { Vector2d } from 'konva/types/types';

import { ShapeCoords } from '../../shared/components/ShapeElement/types';

const availableZoomLevels: number[] = [
  15,
  30,
  45,
  50,
  75,
  90,
  100,
  120,
  140,
  150,
  175,
  190,
  200,
  220,
  240,
  250,
  275,
  300,
];

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

const initialState: CanvasState = {
  selectedShapeElementIds: [],
  selectedLayerName: '',
  zoomLevels: availableZoomLevels,
  scaleIndex: availableZoomLevels.indexOf(100),
  scale: 1,
  canvasOrigin: { x: 0, y: 0 },
  totalShapes: 0,
  newDraggablePointMode: false,
  deleteDraggablePointMode: false,
  magnetMode: true,
  dragging: false,
  selectMode: false,
};

export default initialState;
