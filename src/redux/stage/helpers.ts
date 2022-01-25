import { prepareShape } from '../../shared/components/ShapeElement/helpers';
import { SolarType } from '../../shared/models/Solar.type';
import { SolarElement } from '../../shared/models/SolarElement.interface';

export const getSolarTypeLayer = (type: SolarType): string => {
  switch (type) {
    case 'roof_plane':
      return 'roofs';

    case 'module':
    case 'obstruction':
    case 'tree':
    case 'setback':
      return `${type}s`;

    default:
      return '';
  }
};

export const getRespectiveLayerSolarType = (layerName: string): SolarType => {
  switch (layerName) {
    case 'roofs':
      return 'roof_plane';

    case 'modules':
    case 'obstructions':
    case 'trees':
    case 'setbacks':
    default:
      return layerName.slice(0, -1) as SolarType;
  }
};

export const getLayerZIndex = (type: SolarType): number => {
  switch (type) {
    case 'tree':
      return 1;

    case 'roof_plane':
      return 2;

    case 'setback':
      return 3;

    case 'module':
      return 4;

    case 'obstruction':
    default:
      return 5;
  }
};

export const mapShape = (solarElement: SolarElement) => {
  solarElement.shape = prepareShape(solarElement.shape, solarElement.type);
  return solarElement;
};
