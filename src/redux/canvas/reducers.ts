import { Decimal } from 'decimal.js';

import initialState, { CanvasState } from './state';
import {
  CanvasActionTypes,
  DECREASE_ZOOM,
  DECREMENT_TOTAL_SHAPES,
  DESELECT_SHAPE,
  INCREASE_ZOOM,
  INCREMENT_TOTAL_SHAPES,
  NORMALIZE_ZOOM,
  SELECT_SHAPE,
  SET_CANVAS_ORIGIN,
  SET_DELETE_DRAGGABLE_POINT_MODE,
  SET_DRAGGING,
  SET_MOUSE_POSITION,
  SET_NEW_DRAGGABLE_POINT_MODE,
  SET_SELECT_MODE,
  TOGGLE_MAGNET_MODE,
} from './types';

const canvasReducer = (state = initialState, action: CanvasActionTypes): CanvasState => {
  switch (action.type) {
    /**
     * STORE THE SELECTED ELEMENT BY USER AND ITS LAYER
     */
    case SELECT_SHAPE:
      if (
        (state.selectedShapeElementIds.length > 0 &&
          action.payload.layer !== state.selectedLayerName &&
          action.payload.selectionType === 'add') ||
        (state.selectedShapeElementIds.length === 0 && action.payload.solarElementId.length === 0)
      ) {
        return state;
      }

      let newSelectedShapeElementIds =
        (action.payload.solarElementId.length > 0 && [action.payload.solarElementId]) || [];

      if (action.payload.selectionType === 'add') {
        newSelectedShapeElementIds = Array.from(state.selectedShapeElementIds).concat(newSelectedShapeElementIds);
      }

      return {
        ...state,
        selectedShapeElementIds: newSelectedShapeElementIds,
        selectedLayerName: action.payload.layer,
      };

    case DESELECT_SHAPE:
      return {
        ...state,
        selectedShapeElementIds: Array.from(state.selectedShapeElementIds).filter(
          (elementId: string) => elementId !== action.payload.solarElementId,
        ),
      };

    /**
     * INCREASE THE CANVAS ZOOM
     */
    case INCREASE_ZOOM:
      if (state.scaleIndex === state.zoomLevels.length - 1) {
        return state;
      }

      const nextIndex = state.scaleIndex + 1;
      const newIncreasedScale = new Decimal(state.zoomLevels[nextIndex]).dividedBy(100);

      return {
        ...state,
        scaleIndex: nextIndex,
        scale: newIncreasedScale.toNumber(),
      };

    /**
     * DECREASE THE CANVAS ZOOM
     */
    case DECREASE_ZOOM:
      if (state.scaleIndex === 0) {
        return state;
      }

      let previousIndex = state.scaleIndex - 1;
      const newDecreasedScale = new Decimal(state.zoomLevels[previousIndex]).dividedBy(100);

      return {
        ...state,
        scaleIndex: previousIndex,
        scale: newDecreasedScale.toNumber(),
      };

    /**
     * REVERT ZOOM TO THE DEFAULT = 100%
     */
    case NORMALIZE_ZOOM:
      return {
        ...state,
        scale: 1,
      };

    /**
     * SAVE CANVAS ORIGIN FOR ALL SHAPES
     */
    case SET_CANVAS_ORIGIN:
      return {
        ...state,
        canvasOrigin: action.payload,
      };

    /**
     * WHEN A NEW SHAPE IS ADDED, INCREMENT THIS COUNTER
     */
    case INCREMENT_TOTAL_SHAPES:
      return {
        ...state,
        totalShapes: state.totalShapes + 1,
      };

    /**
     * WHEN A SHAPE IS DELETED, DECREMENT THIS COUNTER
     */
    case DECREMENT_TOTAL_SHAPES:
      let newTotalShapes = state.totalShapes - action.payload;
      if (newTotalShapes < 0) {
        newTotalShapes = 0;
      }
      return {
        ...state,
        totalShapes: newTotalShapes,
      };

    /**
     * ACTIVE OR INACTIVE THE NEW DRAGGABLE POINT MODE WHEN USER CLICKS ON ADD/CANCEL BUTTON IN THE RIGHT DRAWER
     */
    case SET_NEW_DRAGGABLE_POINT_MODE:
      return {
        ...state,
        newDraggablePointMode: action.payload,
      };

    /**
     * ACTIVE OR INACTIVE THE DELETE DRAGGABLE POINT MODE WHEN USER CLICKS ON REMOVE/CANCEL BUTTON IN THE RIGHT DRAWER
     */
    case SET_DELETE_DRAGGABLE_POINT_MODE:
      return {
        ...state,
        deleteDraggablePointMode: action.payload,
      };

    /**
     * SAVE THE MOUSE POSITION THAT WILL BE USED FOR NEW DRAGGABLE POINTS
     */
    case SET_MOUSE_POSITION:
      return {
        ...state,
        mousePosition: action.payload,
      };

    /**
     * TOGGLE MAGNET MODE
     */
    case TOGGLE_MAGNET_MODE:
      return {
        ...state,
        magnetMode: !state.magnetMode,
      };

    /**
     * SET DRAGGING
     */
    case SET_DRAGGING:
      return {
        ...state,
        dragging: action.payload,
      };

    /**
     * SET SELECT MODE
     */
    case SET_SELECT_MODE:
      return {
        ...state,
        selectMode: action.payload,
      };

    default:
      return state;
  }
};

export default canvasReducer;
