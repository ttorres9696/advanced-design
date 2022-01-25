import { Vector2d } from 'konva/types/types';
export declare type RotationIconType = 'right' | 'left';
export declare const RotationIconSize = 12;
export interface RotationArrowIconButtonParams extends Vector2d {
    position: number;
}
export interface RotationArrowIconButtonProps extends RotationArrowIconButtonParams {
    onClick: (position: number) => void;
    rotation: number;
    type: RotationIconType;
    invisible?: boolean;
}
