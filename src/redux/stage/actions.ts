import { Node } from 'konva/types/Node';

import { ShapeCoords } from '../../shared/components/ShapeElement/types';
import { ModuleSpec, SolarDesign } from '../../shared/models/SolarDesign.interface';
import { SolarElement } from '../../shared/models/SolarElement.interface';
import { SelectionType } from '../canvas/types';
import {
  ADD_NEW_DRAGGABLE_POINT,
  ADD_SHAPE,
  CLEAR_TRANSFORMER_NODES_STATE,
  FINISH_HISTORY_ITEM,
  IMPORT_DATA,
  REDO_HISTORY,
  REMOVE_DRAGGABLE_POINT,
  REMOVE_SHAPE,
  RESET_HISTORY,
  SET_SELECTED_ELEMENT,
  SET_SELECTED_MODULE_SPEC,
  SET_TRANSFORMER_NODES,
  SolarElementReference,
  StageActionTypes,
  START_HISTORY_ITEM,
  TOGGLE_LOCK,
  TOGGLE_MODULE,
  TOGGLE_VISIBILITY,
  UNDO_HISTORY,
  UPDATE_SHAPE,
} from './types';

export const addShape = (moduleSeries: string, newShape: SolarElement): StageActionTypes => {
  return {
    type: ADD_SHAPE,
    payload: {
      moduleSeries,
      element: newShape,
    },
  };
};

export const updateShape = (shape: SolarElement): StageActionTypes => {
  return {
    type: UPDATE_SHAPE,
    payload: shape,
  };
};

export const removeShapes = (layer: string, elementIds: string[]): StageActionTypes => {
  return {
    type: REMOVE_SHAPE,
    payload: {
      layer,
      elementIds,
    },
  };
};

export const toggleVisibility = (reference: SolarElementReference): StageActionTypes => {
  return {
    type: TOGGLE_VISIBILITY,
    payload: reference,
  };
};

export const toggleLock = (reference: SolarElementReference): StageActionTypes => {
  return {
    type: TOGGLE_LOCK,
    payload: reference,
  };
};

export const importData = (design: SolarDesign): StageActionTypes => {
  return {
    type: IMPORT_DATA,
    payload: design,
  };
};

export const undoHistory = (): StageActionTypes => {
  return {
    type: UNDO_HISTORY,
  };
};

export const redoHistory = (): StageActionTypes => {
  return {
    type: REDO_HISTORY,
  };
};

export const resetHistory = (): StageActionTypes => {
  return {
    type: RESET_HISTORY,
  };
};

export const startHistoryItem = (ids: string[], layer: string): StageActionTypes => {
  return {
    type: START_HISTORY_ITEM,
    payload: {
      ids,
      layer,
    },
  };
};

export const finishHistoryItem = (ids: string[], layer: string): StageActionTypes => {
  return {
    type: FINISH_HISTORY_ITEM,
    payload: {
      ids,
      layer,
    },
  };
};

export const addNewDraggablePoint = (layer: string, elementId: string, newPoint: ShapeCoords): StageActionTypes => {
  return {
    type: ADD_NEW_DRAGGABLE_POINT,
    payload: {
      layer,
      elementId,
      newPoint,
    },
  };
};

export const removeDraggablePoint = (layer: string, elementId: string, pointIndex: number): StageActionTypes => {
  return {
    type: REMOVE_DRAGGABLE_POINT,
    payload: {
      layer,
      elementId,
      pointIndex,
    },
  };
};

export const setSelectedElement = (layer: string, elementId: string, selected: boolean): StageActionTypes => {
  return {
    type: SET_SELECTED_ELEMENT,
    payload: {
      layer,
      elementId,
      selected,
    },
  };
};

export const setSelectedModuleSpec = (moduleSpec: ModuleSpec): StageActionTypes => {
  return {
    type: SET_SELECTED_MODULE_SPEC,
    payload: moduleSpec,
  };
};

export const setTransformerNodes = (selectionType: SelectionType, elementIds: string[]): StageActionTypes => {
  return {
    type: SET_TRANSFORMER_NODES,
    payload: {
      selectionType,
      elementIds,
    },
  };
};

export const clearTransformerNodesState = (): StageActionTypes => {
  return {
    type: CLEAR_TRANSFORMER_NODES_STATE,
  };
};

export const toggleModule = (elementId: string): StageActionTypes => {
  return {
    type: TOGGLE_MODULE,
    payload: {
      elementId,
    },
  };
};
