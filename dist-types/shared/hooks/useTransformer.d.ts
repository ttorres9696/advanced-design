/// <reference types="react" />
import Konva from 'konva';
import { Node } from 'konva/types/Node';
import { SelectionType } from '../../redux/canvas/types';
import { RotationArrowIconButtonProps } from '../components/TransformableElement/RotationArrowIconButton/types';
declare const useTransformer: () => {
    transformerRef: import("react").MutableRefObject<any>;
    transformerSelectElement: (selectionType: SelectionType, node?: Node<import("konva/types/Node").NodeConfig> | undefined) => void;
    transformerRotationIcons: RotationArrowIconButtonProps[];
    transformerHandleDragElement: (node: Node, e: Konva.KonvaEventObject<DragEvent>) => void;
    transformerRotateElements90Degrees: (position: number) => void;
    transformerOnDragEnd: (layer: string, node: Node) => string[];
};
export default useTransformer;
