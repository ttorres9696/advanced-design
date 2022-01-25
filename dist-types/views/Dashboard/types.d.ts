import { CallbacksProps } from '../../shared/models/CallbacksProps.interface';
import { SolarDesign } from '../../shared/models/SolarDesign.interface';
export interface DashboardProps extends CallbacksProps {
    solarDesign: SolarDesign;
}
