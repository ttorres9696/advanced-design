import Konva from 'konva';
import { Node } from 'konva/types/Node';
import { Line } from 'konva/types/shapes/Line';
import { Transformer } from 'konva/types/shapes/Transformer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux';
import { deselectShape } from '../../redux/canvas/actions';
import { SelectionType } from '../../redux/canvas/types';
import {
  clearTransformerNodesState,
  finishHistoryItem,
  startHistoryItem,
  updateShape,
} from '../../redux/stage/actions';
import {
  RotationArrowIconButtonProps,
  RotationIconSize,
} from '../components/TransformableElement/RotationArrowIconButton/types';
import { TransformableElementChangeParams, TransformerDimensions } from '../components/TransformableElement/types';
import { getCurrentModulePointsRotation } from '../helpers/modules.helper';
import { convertLinePointsToShapePoints, getRotatedPoints } from '../helpers/polygons.helper';
import { TransformerDeletedElements } from '../models/TransformerDeletedElements.interface';

const useTransformer = () => {
  const dispatch = useDispatch();

  const selectedShapeElementIds = useSelector((state: RootState) => state.canvas.selectedShapeElementIds || []);
  const selectedLayerName = useSelector((state: RootState) => state.canvas.selectedLayerName || '');
  const layers = useSelector(
    (state: RootState) =>
      (state.stage.selectedModuleSpec &&
        state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].layers) ||
      {},
  );
  const transformerNodes = useSelector((state: RootState) => state.stage.transformerNodes);

  const transformerRef = useRef<any>();

  const [selectedElements, setSelectedElements] = useState<Node[]>([]);
  const [rotationIcons, setRotationIcons] = useState<RotationArrowIconButtonProps[]>([]);
  const [transformerDimensions, setTransformerDimensions] = useState<TransformerDimensions>({
    width: 0,
    height: 0,
  });

  const saveChangeOnState = useCallback(
    (id: string, layer: string, params: TransformableElementChangeParams) => {
      dispatch(
        updateShape({
          ...layers[layer][id],
          shape: {
            ...layers[layer][id].shape,
            ...params,
          },
        }),
      );
    },
    [dispatch, layers],
  );

  const handleDragElement = useCallback(
    (node: Node, e: Konva.KonvaEventObject<DragEvent>) => {
      if (selectedShapeElementIds.includes(node.id())) {
        selectedElements.forEach(element => {
          if (element._id !== node._id) {
            element.position(node.position());
          }
        });
      }
    },
    [selectedElements, selectedShapeElementIds],
  );

  const onDragEnd = useCallback(
    (layer: string, node: Node): string[] => {
      const draggedElements: Node[] = selectedShapeElementIds.includes(node.id())
        ? Array.from(selectedElements)
        : [node];

      return draggedElements.map((draggedNode: Node) => {
        if ((draggedNode as any).radius) {
          // CIRCLE
          saveChangeOnState(draggedNode.id(), layer, {
            x: draggedNode.x(),
            y: draggedNode.y(),
          });
        } else {
          // POLYGON
          const x = draggedNode.x();
          const y = draggedNode.y();

          const points = (draggedNode as Line).points().map((coord: number, index: number) => {
            if (index % 2 === 0) {
              return coord + x;
            } else {
              return coord + y;
            }
          }) as number[];

          draggedNode.x(0);
          draggedNode.y(0);

          saveChangeOnState(draggedNode.id(), layer, {
            points: points.reduce((result: number[][], coord: number, index: number) => {
              if (index % 2 === 0) {
                result.push([coord, points[index + 1]]);
              }

              return result;
            }, []),
          });
        }

        return draggedNode.id();
      });
    },
    [saveChangeOnState, selectedShapeElementIds, selectedElements],
  );

  const selectElement = useCallback(
    (selectionType: SelectionType, node?: Node) => {
      if (transformerRef && transformerRef.current) {
        const transformer = transformerRef.current as Transformer;

        const nodeArray = (node && [node]) || [];

        const newSelectedElements =
          selectionType === 'add' ? Array.from(transformer.nodes()).concat(nodeArray) : nodeArray;

        transformer.nodes(newSelectedElements);
        transformer.getLayer()?.batchDraw();

        setSelectedElements(newSelectedElements);

        setRotationIcons([]);
        setTransformerDimensions({
          width: 0,
          height: 0,
        });
      }
    },
    [transformerRef, setSelectedElements, setRotationIcons, setTransformerDimensions],
  );

  const addRotationIconsToTransformer = useCallback(
    (transformer: Transformer) => {
      const halfSize = RotationIconSize / 2;

      setRotationIcons([
        {
          x: -(RotationIconSize + 2),
          y: -(halfSize - 2),
          type: 'left',
          rotation: -40,
          onClick: () => {},
          position: 0,
        },
        {
          x: transformer.getWidth() + 4,
          y: -RotationIconSize,
          type: 'right',
          rotation: 40,
          onClick: () => {},
          position: 1,
        },
        {
          x: transformer.getWidth() + RotationIconSize + 1,
          y: transformer.getHeight() + halfSize - 2,
          type: 'left',
          rotation: 135,
          onClick: () => {},
          position: 2,
        },
        {
          x: -halfSize,
          y: transformer.getHeight() + RotationIconSize,
          type: 'right',
          rotation: -135,
          onClick: () => () => {},
          position: 3,
        },
      ]);

      setTransformerDimensions({
        width: transformer.getWidth(),
        height: transformer.getHeight(),
      });
    },
    [setRotationIcons, setTransformerDimensions],
  );

  const rotateElements90Degrees = useCallback(
    (position: number) => {
      dispatch(startHistoryItem(selectedShapeElementIds, selectedLayerName));

      selectedShapeElementIds.forEach((elementId: string) => {
        const shapeElement = selectedElements.find(node => node.id() === elementId);

        if (shapeElement && (shapeElement as Line).points) {
          const rotatedPoints = getRotatedPoints(
            position % 2 === 0 ? -90 : 90,
            convertLinePointsToShapePoints((shapeElement as Line).points()),
          );

          dispatch(
            updateShape({
              ...layers[selectedLayerName][elementId],
              shape: {
                ...layers[selectedLayerName][elementId].shape,
                points: rotatedPoints,
                pointsRotationInRadians: getCurrentModulePointsRotation(rotatedPoints),
              },
            }),
          );
        }
      });

      dispatch(finishHistoryItem(selectedShapeElementIds, selectedLayerName));
    },
    [dispatch, selectedLayerName, selectedShapeElementIds, layers, selectedElements],
  );

  const checkTransformerDimensions = useCallback(() => {
    if (transformerRef && transformerRef.current) {
      const transformer = transformerRef.current as Transformer;

      if (
        transformer.getWidth() !== transformerDimensions.width ||
        transformer.getHeight() !== transformerDimensions.height
      ) {
        addRotationIconsToTransformer(transformer);
      }
    }
  }, [transformerRef, transformerDimensions, addRotationIconsToTransformer]);

  useEffect(() => {
    if (selectedShapeElementIds.length === 0 && selectedElements.length > 0) {
      selectElement('reset');
    }
  }, [selectedShapeElementIds, selectElement, selectedElements]);

  useEffect(() => {
    if (transformerNodes && transformerRef.current) {
      const transformer = transformerRef.current as Transformer;
      const stage = transformer.getStage();

      if (stage) {
        transformerNodes.elementIds.forEach((elementId: string, index: number) => {
          const node = stage.findOne(`#${elementId}`);

          if (node) {
            selectElement(index === 0 ? transformerNodes.selectionType : 'add', node);
          }
        });

        dispatch(clearTransformerNodesState());
      }
    }
  }, [dispatch, transformerNodes, transformerRef.current, selectElement]);

  useEffect(() => {
    if (selectedElements.length > 0 && transformerRef && transformerRef.current && selectedLayerName) {
      const transformer = transformerRef.current as Transformer;

      const deletedElementIds = selectedElements.reduce(
        (result: TransformerDeletedElements, node: Node) => {
          if (!layers[selectedLayerName][node.id()]) {
            result.delete.push(node.id());

            // deselect from state
            dispatch(deselectShape(node.id()));
          } else {
            result.keepNodes.push(node);
          }

          return result;
        },
        {
          delete: [],
          keepNodes: [],
        } as TransformerDeletedElements,
      );

      if (deletedElementIds.delete.length > 0) {
        transformer.nodes(deletedElementIds.keepNodes);
        transformer.getLayer()?.batchDraw();

        // remove nodes from selectedElements
        setSelectedElements(deletedElementIds.keepNodes);
      }
    }
  }, [layers, selectedElements, dispatch, selectedLayerName, setSelectedElements, transformerRef]);

  checkTransformerDimensions();

  return {
    transformerRef,
    transformerSelectElement: selectElement,
    transformerRotationIcons: rotationIcons,
    transformerHandleDragElement: handleDragElement,
    transformerRotateElements90Degrees: rotateElements90Degrees,
    transformerOnDragEnd: onDragEnd,
  };
};

export default useTransformer;
