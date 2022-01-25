import { ShapeCoords } from '../../shared/components/ShapeElement/types';
import { ModuleSpec, SolarDesign } from '../../shared/models/SolarDesign.interface';
import { SolarElement } from '../../shared/models/SolarElement.interface';
import { SelectionType } from '../canvas/types';
import { SolarElementReference, StageActionTypes } from './types';
export declare const addShape: (moduleSeries: string, newShape: SolarElement) => StageActionTypes;
export declare const updateShape: (shape: SolarElement) => StageActionTypes;
export declare const removeShapes: (layer: string, elementIds: string[]) => StageActionTypes;
export declare const toggleVisibility: (reference: SolarElementReference) => StageActionTypes;
export declare const toggleLock: (reference: SolarElementReference) => StageActionTypes;
export declare const importData: (design: SolarDesign) => StageActionTypes;
export declare const undoHistory: () => StageActionTypes;
export declare const redoHistory: () => StageActionTypes;
export declare const resetHistory: () => StageActionTypes;
export declare const startHistoryItem: (ids: string[], layer: string) => StageActionTypes;
export declare const finishHistoryItem: (ids: string[], layer: string) => StageActionTypes;
export declare const addNewDraggablePoint: (layer: string, elementId: string, newPoint: ShapeCoords) => StageActionTypes;
export declare const removeDraggablePoint: (layer: string, elementId: string, pointIndex: number) => StageActionTypes;
export declare const setSelectedElement: (layer: string, elementId: string, selected: boolean) => StageActionTypes;
export declare const setSelectedModuleSpec: (moduleSpec: ModuleSpec) => StageActionTypes;
export declare const setTransformerNodes: (selectionType: SelectionType, elementIds: string[]) => StageActionTypes;
export declare const clearTransformerNodesState: () => StageActionTypes;
export declare const toggleModule: (elementId: string) => StageActionTypes;
