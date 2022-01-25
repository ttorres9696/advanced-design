import { ShapeParams } from '../components/ShapeElement/types';
import { ModuleSpec } from '../models/SolarDesign.interface';
import { SolarElement } from '../models/SolarElement.interface';
export declare const getModuleDesignPoints: (moduleSpec: ModuleSpec) => number[][];
export declare const getCurrentModulePointsRotation: (points: number[][]) => number[];
export declare const getMagnetAlignment: (pivot: SolarElement, modules: SolarElement[], selectedElementIds: string[]) => ShapeParams | undefined;
