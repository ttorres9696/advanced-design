export interface CirclePropertiesProps {
    x?: number;
    y?: number;
    radius?: number;
    updateShapeProperty: (attr: string, value: any) => void;
}
