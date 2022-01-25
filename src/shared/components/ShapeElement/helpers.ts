import { Decimal } from 'decimal.js';

import { defaultMultiplierScale } from '../../../redux/stage/types';
import { lockedTypes } from '../../helpers/polygons.helper';
import { SolarType } from '../../models/Solar.type';
import { ShapeParams } from './types';

export const prepareShape = (shape: ShapeParams, elementType: SolarType): ShapeParams => {
  shape = {
    points: shape.points?.map(point => {
      return [
        new Decimal(point[0]).mul(defaultMultiplierScale).toNumber(),
        new Decimal(point[1]).mul(defaultMultiplierScale).toNumber(),
      ];
    }),
    radius: shape.radius ? new Decimal(shape.radius).mul(defaultMultiplierScale).toNumber() : 0,
    x: shape.center ? new Decimal(shape.center[0]).mul(defaultMultiplierScale).toNumber() : 0,
    y: shape.center ? new Decimal(shape.center[1]).mul(defaultMultiplierScale).toNumber() : 0,
    type: shape.type,
    visible: true,
    locked: lockedTypes.includes(elementType),
    pointsRotationInRadians: shape.pointsRotationInRadians,
    selected: false,
  };

  return shape;
};
