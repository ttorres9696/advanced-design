import { Vector2d } from 'konva/types/types';
export interface DraggablePointParams extends Vector2d {
    position: number;
}
export interface DraggablePointProps extends DraggablePointParams {
    onStart: () => void;
    onChange: (x: number, y: number, position: number) => void;
    onEnd: (x: number, y: number, position: number) => void;
    onClick: (position: number) => void;
    deleteDraggablePointMode: boolean;
    invisible?: boolean;
}
