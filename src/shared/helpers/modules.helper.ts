import { ShapeParams } from '../components/ShapeElement/types';
import { ModuleSpec } from '../models/SolarDesign.interface';
import { SolarElement } from '../models/SolarElement.interface';
import {
  checkIfThereIsProximity,
  getPolygonCentroid,
  getTransformedPointsByRotationInRadians,
} from './polygons.helper';

export const getModuleDesignPoints = (moduleSpec: ModuleSpec): number[][] => {
  const width = moduleSpec.size[0] - moduleSpec.spacing[0];
  const height = moduleSpec.size[1] - moduleSpec.spacing[1];
  return [
    [0, 0],
    [0, height],
    [width, height],
    [width, 0],
  ];
};

export const getCurrentModulePointsRotation = (points: number[][]): number[] => {
  const centroid = getPolygonCentroid(points);

  return points.map(point => Math.atan2(point[1] - centroid.y, point[0] - centroid.x));
};

export const getMagnetAlignment = (
  pivot: SolarElement,
  modules: SolarElement[],
  selectedElementIds: string[],
): ShapeParams | undefined => {
  const moduleInIntersection: SolarElement | undefined = modules.find(
    (module: SolarElement) =>
      module.id !== pivot.id &&
      checkIfThereIsProximity(pivot.shape.points!, module.shape.points!) &&
      !(selectedElementIds.includes(module.id) && selectedElementIds.includes(pivot.id)),
  );

  if (!moduleInIntersection) {
    return;
  }

  return {
    ...pivot.shape,
    pointsRotationInRadians: moduleInIntersection.shape.pointsRotationInRadians,
    points: getTransformedPointsByRotationInRadians(
      moduleInIntersection.shape.pointsRotationInRadians!,
      pivot.shape.points!,
    ),
  } as ShapeParams;
};
