import { Vector2d } from 'konva/types/types';

import { ShapeCoords } from '../../shared/components/ShapeElement/types';
import {
  CanvasActionTypes,
  DECREASE_ZOOM,
  DECREMENT_TOTAL_SHAPES,
  DESELECT_SHAPE,
  INCREASE_ZOOM,
  INCREMENT_TOTAL_SHAPES,
  NORMALIZE_ZOOM,
  SELECT_SHAPE,
  SelectionType,
  SET_CANVAS_ORIGIN,
  SET_DELETE_DRAGGABLE_POINT_MODE,
  SET_DRAGGING,
  SET_MOUSE_POSITION,
  SET_NEW_DRAGGABLE_POINT_MODE,
  SET_SELECT_MODE,
  TOGGLE_MAGNET_MODE,
} from './types';

export const selectShape = (solarElementId: string, layer: string, selectionType: SelectionType): CanvasActionTypes => {
  return {
    type: SELECT_SHAPE,
    payload: {
      solarElementId,
      layer,
      selectionType,
    },
  };
};

export const deselectShape = (solarElementId: string): CanvasActionTypes => {
  return {
    type: DESELECT_SHAPE,
    payload: {
      solarElementId,
    },
  };
};

export const increaseZoom = (): CanvasActionTypes => {
  return {
    type: INCREASE_ZOOM,
  };
};

export const decreaseZoom = (): CanvasActionTypes => {
  return {
    type: DECREASE_ZOOM,
  };
};

export const normalizeZoom = (): CanvasActionTypes => {
  return {
    type: NORMALIZE_ZOOM,
  };
};

export const setCanvasOrigin = (canvasCoords: ShapeCoords): CanvasActionTypes => {
  return {
    type: SET_CANVAS_ORIGIN,
    payload: canvasCoords,
  };
};

export const incrementTotalShapes = (): CanvasActionTypes => {
  return {
    type: INCREMENT_TOTAL_SHAPES,
  };
};

export const decrementTotalShapes = (count?: number): CanvasActionTypes => {
  return {
    type: DECREMENT_TOTAL_SHAPES,
    payload: count || 1,
  };
};

export const setNewDraggablePointMode = (mode: boolean): CanvasActionTypes => {
  return {
    type: SET_NEW_DRAGGABLE_POINT_MODE,
    payload: mode,
  };
};

export const setDeleteDraggablePointMode = (mode: boolean): CanvasActionTypes => {
  return {
    type: SET_DELETE_DRAGGABLE_POINT_MODE,
    payload: mode,
  };
};

export const setMousePosition = (mousePosition?: Vector2d): CanvasActionTypes => {
  return {
    type: SET_MOUSE_POSITION,
    payload: mousePosition,
  };
};

export const toggleMagnetMode = (): CanvasActionTypes => {
  return {
    type: TOGGLE_MAGNET_MODE,
  };
};

export const setDragging = (enabled: boolean): CanvasActionTypes => {
  return {
    type: SET_DRAGGING,
    payload: enabled,
  };
};

export const setSelectMode = (enabled: boolean): CanvasActionTypes => {
  return {
    type: SET_SELECT_MODE,
    payload: enabled,
  };
};
