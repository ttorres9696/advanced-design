import { ShapeCoords } from '../../shared/components/ShapeElement/types';
import { ModuleSpec, SolarDesign } from '../../shared/models/SolarDesign.interface';
import { SolarElement } from '../../shared/models/SolarElement.interface';
import { SelectionType } from '../canvas/types';
export declare const ADD_SHAPE = "ADD_SHAPE";
export declare const UPDATE_SHAPE = "UPDATE_SHAPE";
export declare const REMOVE_SHAPE = "REMOVE_SHAPE";
export declare const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY";
export declare const TOGGLE_LOCK = "TOGGLE_LOCK";
export declare const IMPORT_DATA = "IMPORT_DATA";
export declare const UNDO_HISTORY = "UNDO_HISTORY";
export declare const REDO_HISTORY = "REDO_HISTORY";
export declare const RESET_HISTORY = "RESET_HISTORY";
export declare const START_HISTORY_ITEM = "START_HISTORY_ITEM";
export declare const FINISH_HISTORY_ITEM = "FINISH_HISTORY_ITEM";
export declare const ADD_NEW_DRAGGABLE_POINT = "ADD_NEW_DRAGGABLE_POINT";
export declare const REMOVE_DRAGGABLE_POINT = "REMOVE_DRAGGABLE_POINT";
export declare const SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT";
export declare const SET_SELECTED_MODULE_SPEC = "SET_SELECTED_MODULE_SPEC";
export declare const SET_TRANSFORMER_NODES = "SET_TRANSFORMER_NODES";
export declare const CLEAR_TRANSFORMER_NODES_STATE = "CLEAR_TRANSFORMER_NODES_STATE";
export declare const TOGGLE_MODULE = "TOGGLE_MODULE";
export declare const defaultMultiplierScale = 10;
export interface SolarElementReference {
    layer?: string;
    id: string;
}
interface AddShapeAction {
    type: typeof ADD_SHAPE;
    payload: {
        element: SolarElement;
        moduleSeries: string;
    };
}
interface UpdateShapeAction {
    type: typeof UPDATE_SHAPE;
    payload: SolarElement;
}
interface RemoveShapeAction {
    type: typeof REMOVE_SHAPE;
    payload: {
        layer: string;
        elementIds: string[];
    };
}
interface ToggleVisibilityAction {
    type: typeof TOGGLE_VISIBILITY;
    payload: SolarElementReference;
}
interface ToggleLockAction {
    type: typeof TOGGLE_LOCK;
    payload: SolarElementReference;
}
interface ImportDataAction {
    type: typeof IMPORT_DATA;
    payload: SolarDesign;
}
interface UndoHistoryAction {
    type: typeof UNDO_HISTORY;
}
interface RedoHistoryAction {
    type: typeof REDO_HISTORY;
}
interface ResetHistoryAction {
    type: typeof RESET_HISTORY;
}
interface StartHistoryItemAction {
    type: typeof START_HISTORY_ITEM;
    payload: {
        ids: string[];
        layer: string;
    };
}
interface FinishHistoryItemAction {
    type: typeof FINISH_HISTORY_ITEM;
    payload: {
        ids: string[];
        layer: string;
    };
}
interface AddNewDraggablePoint {
    type: typeof ADD_NEW_DRAGGABLE_POINT;
    payload: {
        layer: string;
        elementId: string;
        newPoint: ShapeCoords;
    };
}
interface RemoveDraggablePoint {
    type: typeof REMOVE_DRAGGABLE_POINT;
    payload: {
        layer: string;
        elementId: string;
        pointIndex: number;
    };
}
interface SetSelectedElement {
    type: typeof SET_SELECTED_ELEMENT;
    payload: {
        layer: string;
        elementId: string;
        selected: boolean;
    };
}
interface SetSelectedModuleSpec {
    type: typeof SET_SELECTED_MODULE_SPEC;
    payload: ModuleSpec;
}
interface SetTransformerNodes {
    type: typeof SET_TRANSFORMER_NODES;
    payload: {
        selectionType: SelectionType;
        elementIds: string[];
    };
}
interface ClearTransformerNodesState {
    type: typeof CLEAR_TRANSFORMER_NODES_STATE;
}
interface ToggleModule {
    type: typeof TOGGLE_MODULE;
    payload: {
        elementId: string;
    };
}
export declare type StageActionTypes = AddShapeAction | UpdateShapeAction | RemoveShapeAction | ToggleVisibilityAction | ToggleLockAction | ImportDataAction | UndoHistoryAction | RedoHistoryAction | ResetHistoryAction | StartHistoryItemAction | FinishHistoryItemAction | AddNewDraggablePoint | RemoveDraggablePoint | SetSelectedElement | SetSelectedModuleSpec | SetTransformerNodes | ClearTransformerNodesState | ToggleModule;
export {};
