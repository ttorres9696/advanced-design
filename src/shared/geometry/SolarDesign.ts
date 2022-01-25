import { Decimal } from 'decimal.js';

import { originCoords } from '../../redux/canvas/types';
import { defaultMultiplierScale } from '../../redux/stage/types';
import { ShapeCoords } from '../components/ShapeElement/types';
import { Padding } from '../models/Padding.interface';
import { SolarDesign } from '../models/SolarDesign.interface';
import { SolarElement } from '../models/SolarElement.interface';

export const getLowerCoords = (solarDesign: SolarDesign, padding?: Padding): ShapeCoords => {
  const initialValue: ShapeCoords = {
    x: 0,
    y: 0,
  };

  const lowerPoints: ShapeCoords = Object.values(solarDesign.layers).reduce(
    (point: ShapeCoords, layer: SolarElement[]) => {
      return layer.reduce((layerPoint: ShapeCoords, solarElement: SolarElement) => {
        if (solarElement.shape.points) {
          return solarElement.shape.points!.reduce((prev: ShapeCoords, point) => {
            return {
              x: prev.x! > point[0] ? point[0] : prev.x,
              y: prev.y! > point[1] ? point[1] : prev.y,
            };
          }, layerPoint);
        } else {
          return {
            x: layerPoint.x! > solarElement.shape.center![0] ? solarElement.shape.center![0] : layerPoint.x,
            y: layerPoint.y! > solarElement.shape.center![1] ? solarElement.shape.center![1] : layerPoint.y,
          };
        }
      }, point);
    },
    initialValue,
  );
  return {
    x: new Decimal(Math.abs(lowerPoints.x!))
      .mul(defaultMultiplierScale)
      .plus(originCoords)
      .plus(padding && padding.left ? padding.left : 0)
      .toNumber(),
    y: new Decimal(Math.abs(lowerPoints.y!))
      .mul(defaultMultiplierScale)
      .plus(originCoords)
      .plus(padding && padding.top ? padding.top : 0)
      .toNumber(),
  };
};
