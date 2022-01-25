import { SolarElement } from './SolarElement.interface';
export declare type LayerType = 'module' | 'roof';
export interface Layer {
    type: LayerType;
    children: SolarElement[];
}
