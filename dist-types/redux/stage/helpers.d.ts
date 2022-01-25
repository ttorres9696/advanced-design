import { SolarType } from '../../shared/models/Solar.type';
import { SolarElement } from '../../shared/models/SolarElement.interface';
export declare const getSolarTypeLayer: (type: SolarType) => string;
export declare const getRespectiveLayerSolarType: (layerName: string) => SolarType;
export declare const getLayerZIndex: (type: SolarType) => number;
export declare const mapShape: (solarElement: SolarElement) => SolarElement;
