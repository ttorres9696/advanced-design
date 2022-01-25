import { CallbacksProps } from './shared/models/CallbacksProps.interface';
import { SolarDesign } from './shared/models/SolarDesign.interface';

export interface AdvancedDesignProps extends CallbacksProps {
  solarDesign: SolarDesign;
}
