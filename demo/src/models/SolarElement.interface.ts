import { ShapeParams } from './ShapeParams.interface';
import { SolarType } from './Solar.type';

export interface SolarElement {
  id: string;
  roof_id?: string;
  shape: ShapeParams;
  type: SolarType;
  azimuth?: number;
  tilt?: number;
}
