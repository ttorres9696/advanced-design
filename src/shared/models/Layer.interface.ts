import { SolarElement } from './SolarElement.interface';

export type LayerType = 'module' | 'roof';

export interface Layer {
  type: LayerType;
  children: SolarElement[];
}
