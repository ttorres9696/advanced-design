/// <reference types="react" />
import { KonvaEventObject, Node } from 'konva/types/Node';
import { Rect } from 'konva/types/shapes/Rect';
import { SelectionType } from '../../redux/canvas/types';
declare const useRectSelection: (selectElement: (id: string, layer: string, selectionType: SelectionType, node?: Node<import("konva/types/Node").NodeConfig> | undefined) => void) => {
    setRectSelectionRef: import("react").Dispatch<import("react").SetStateAction<Rect | null | undefined>>;
    rectSelectionHandleTouchStart: (e: KonvaEventObject<any>) => void;
    rectSelectionHandleTouchMove: (e: KonvaEventObject<any>) => void;
    rectSelectionHandleTouchEnd: () => void;
};
export default useRectSelection;
