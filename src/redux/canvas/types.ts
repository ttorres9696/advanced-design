import { Vector2d } from 'konva/types/types';

import { ShapeCoords } from '../../shared/components/ShapeElement/types';

export const SELECT_SHAPE = 'SELECT_SHAPE';
export const DESELECT_SHAPE = 'DESELECT_SHAPE';
export const INCREASE_ZOOM = 'INCREASE_ZOOM';
export const DECREASE_ZOOM = 'DECREASE_ZOOM';
export const NORMALIZE_ZOOM = 'NORMALIZE_ZOOM';
export const SET_CANVAS_ORIGIN = 'SET_CANVAS_ORIGIN';
export const INCREMENT_TOTAL_SHAPES = 'INCREMENT_TOTAL_SHAPES';
export const DECREMENT_TOTAL_SHAPES = 'DECREMENT_TOTAL_SHAPES';
export const SET_NEW_DRAGGABLE_POINT_MODE = 'SET_NEW_DRAGGABLE_POINT_MODE';
export const SET_MOUSE_POSITION = 'SET_MOUSE_POSITION';
export const SET_DELETE_DRAGGABLE_POINT_MODE = 'SET_DELETE_DRAGGABLE_POINT_MODE';
export const TOGGLE_MAGNET_MODE = 'TOGGLE_MAGNET_MODE';
export const SET_DRAGGING = 'SET_DRAGGING';
export const SET_SELECT_MODE = 'SET_SELECT_MODE';

export const originCoords = 20;
export type SelectionType = 'reset' | 'add';

interface SelectShapeAction {
  type: typeof SELECT_SHAPE;
  payload: {
    solarElementId: string;
    layer: string;
    selectionType: SelectionType;
  };
}

interface DeselectShapeAction {
  type: typeof DESELECT_SHAPE;
  payload: {
    solarElementId: string;
  };
}

interface IncreaseZoomAction {
  type: typeof INCREASE_ZOOM;
}

interface DecreaseZoomAction {
  type: typeof DECREASE_ZOOM;
}

interface NormalizeZoomAction {
  type: typeof NORMALIZE_ZOOM;
}

interface SetCanvasOriginAction {
  type: typeof SET_CANVAS_ORIGIN;
  payload: ShapeCoords;
}

interface IncrementTotalShapesAction {
  type: typeof INCREMENT_TOTAL_SHAPES;
}

interface DecrementTotalShapesAction {
  type: typeof DECREMENT_TOTAL_SHAPES;
  payload: number;
}

interface SetNewDraggablePointModeAction {
  type: typeof SET_NEW_DRAGGABLE_POINT_MODE;
  payload: boolean;
}

interface SetDeleteDraggablePointMode {
  type: typeof SET_DELETE_DRAGGABLE_POINT_MODE;
  payload: boolean;
}

interface SetMousePositionAction {
  type: typeof SET_MOUSE_POSITION;
  payload?: Vector2d;
}

interface ToggleMagnetModeAction {
  type: typeof TOGGLE_MAGNET_MODE;
}

interface SetDragging {
  type: typeof SET_DRAGGING;
  payload: boolean;
}

interface SetSelectMode {
  type: typeof SET_SELECT_MODE;
  payload: boolean;
}

export type CanvasActionTypes =
  | SelectShapeAction
  | DeselectShapeAction
  | IncreaseZoomAction
  | DecreaseZoomAction
  | NormalizeZoomAction
  | SetCanvasOriginAction
  | IncrementTotalShapesAction
  | DecrementTotalShapesAction
  | SetNewDraggablePointModeAction
  | SetDeleteDraggablePointMode
  | SetMousePositionAction
  | ToggleMagnetModeAction
  | SetDragging
  | SetSelectMode;
