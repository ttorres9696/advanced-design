import { SolarElement } from './SolarElement.interface';

export interface SolarDesignLayers {
  roofs: SolarElement[];
  modules: SolarElement[];
  trees: SolarElement[];
  setbacks: SolarElement[];
  obstructions: SolarElement[];
}

export interface ModuleSpec {
  name: string;
  series: string;
  size: number[];
  spacing: number[];
  wattage: number;
}

export interface SolarDesign {
  layers: SolarDesignLayers;
  modules_spec: ModuleSpec;
}
