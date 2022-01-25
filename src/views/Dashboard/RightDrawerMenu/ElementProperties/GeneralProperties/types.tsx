export interface GeneralPropertiesProps {
  azimuth?: number;
  tilt?: number;
  updateProperty: (attr: string, value: any) => void;
  deleteObject: () => void;
}
