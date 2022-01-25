import { Vector2d } from 'konva/types/types';

export type RotationIconType = 'right' | 'left';
export const RotationIconSize = 12;

export interface RotationArrowIconButtonParams extends Vector2d {
  position: number;
}

export interface RotationArrowIconButtonProps extends RotationArrowIconButtonParams {
  onClick: (position: number) => void;
  rotation: number;
  type: RotationIconType;
  invisible?: boolean;
}
