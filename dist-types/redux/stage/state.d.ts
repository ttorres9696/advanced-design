import { ModuleSpec } from '../../shared/models/SolarDesign.interface';
import { SolarElement } from '../../shared/models/SolarElement.interface';
import { SelectionType } from '../canvas/types';
export declare type HistoryItemAction = 'added' | 'updated' | 'deleted';
export interface HistoryItem {
    action: HistoryItemAction;
    layer: string;
    elementId: string;
    oldElement?: SolarElement;
    newElement?: SolarElement;
}
export interface SolarElementsById {
    [elementId: string]: SolarElement;
}
export interface ModuleSpecStage {
    layers: {
        trees: SolarElementsById;
        roofs: SolarElementsById;
        setbacks: SolarElementsById;
        modules: SolarElementsById;
        obstructions: SolarElementsById;
    };
    pendingHistoryBatch: HistoryItem[];
    history: HistoryItem[][];
    activeHistoryIndex: number;
}
export interface StageState {
    layersOrder: string[];
    selectedModuleSpec?: ModuleSpec;
    moduleSpecsStages: {
        [moduleSpec: string]: ModuleSpecStage;
    };
    transformerNodes?: {
        selectionType: SelectionType;
        elementIds: string[];
    };
}
declare const initialState: StageState;
export default initialState;
