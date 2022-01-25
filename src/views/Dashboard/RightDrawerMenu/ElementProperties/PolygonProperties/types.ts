export interface PolygonPropertiesProps {
  points?: number[][];
  updateShapeProperty: (attr: string, value: any) => void;
  deletePoint: (index: number) => void;
}
