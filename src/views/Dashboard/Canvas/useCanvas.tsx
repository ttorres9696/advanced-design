import Konva from 'konva';
import { Group } from 'konva/types/Group';
import { Layer } from 'konva/types/Layer';
import { KonvaEventObject, Node } from 'konva/types/Node';
import { Line } from 'konva/types/shapes/Line';
import { Stage } from 'konva/types/Stage';
import { Vector2d } from 'konva/types/types';
import { Transform } from 'konva/types/Util';
import { difference } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import {
  incrementTotalShapes,
  selectShape,
  setCanvasOrigin,
  setDeleteDraggablePointMode,
  setMousePosition,
  setNewDraggablePointMode,
} from '../../../redux/canvas/actions';
import { SelectionType } from '../../../redux/canvas/types';
import { setDeleteDialogParams } from '../../../redux/core/actions';
import {
  addNewDraggablePoint,
  addShape,
  finishHistoryItem,
  setSelectedElement,
  setSelectedModuleSpec,
  startHistoryItem,
  toggleModule,
  updateShape,
} from '../../../redux/stage/actions';
import { ShapeCoords } from '../../../shared/components/ShapeElement/types';
import { TransformableElementChangeParams } from '../../../shared/components/TransformableElement/types';
import { getLowerCoords } from '../../../shared/geometry/SolarDesign';
import { getCurrentModulePointsRotation, getMagnetAlignment } from '../../../shared/helpers/modules.helper';
import { convertLinePointsToShapePoints } from '../../../shared/helpers/polygons.helper';
import { SolarElement } from '../../../shared/models/SolarElement.interface';
import { CanvasDimension, UseCanvasProps } from './types';

const useCanvas = ({
  solarDesign,
  transformerSelectElement,
  transformerHandleDragElement,
  transformerOnDragEnd,
}: UseCanvasProps) => {
  const dispatch = useDispatch();

  const [dragging, setDragging] = useState<boolean>(false);

  const layersOrder = useSelector((state: RootState) => state.stage.layersOrder);
  const layers = useSelector(
    (state: RootState) =>
      (state.stage.selectedModuleSpec &&
        state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].layers) || {
        trees: {},
        roofs: {},
        setbacks: {},
        modules: {},
        obstructions: {},
      },
  );

  const selectMode = useSelector((state: RootState) => state.canvas.selectMode);
  const selectedShapeElementIds = useSelector((state: RootState) => state.canvas.selectedShapeElementIds || []);
  const selectedLayerName = useSelector((state: RootState) => state.canvas.selectedLayerName || '');
  const magnetMode = useSelector((state: RootState) => state.canvas.magnetMode);
  const newDraggablePointMode = useSelector((state: RootState) => state.canvas.newDraggablePointMode);
  const mousePosition = useSelector((state: RootState) => state.canvas.mousePosition);
  const deleteDraggablePointMode = useSelector((state: RootState) => state.canvas.deleteDraggablePointMode);
  const canvasOrigin = useSelector((state: RootState) => state.canvas.canvasOrigin);
  const scale = useSelector((state: RootState) => state.canvas.scale);

  const [stageRef, setStageRef] = useState<Stage | null>(null);

  const onStartChange = useCallback((id: string, layer: string) => dispatch(startHistoryItem([id], layer)), [dispatch]);

  const onFinishChange = useCallback((id: string, layer: string) => dispatch(finishHistoryItem([id], layer)), [
    dispatch,
  ]);

  const selectElement = useCallback(
    (id: string, layer: string, selectionType: SelectionType, node?: Node) => {
      if (selectMode && (layer !== 'modules' || (layer === 'modules' && layers.modules[id].active))) {
        if (selectionType === 'reset') {
          selectedShapeElementIds.forEach((elementId: string) => {
            dispatch(setSelectedElement(selectedLayerName, elementId, false));
          });
        }

        if (id.length > 0 && (selectionType === 'reset' || (selectionType === 'add' && layer === selectedLayerName))) {
          dispatch(setSelectedElement(layer, id, true));
        }

        dispatch(selectShape(id, layer, selectionType));
        dispatch(setNewDraggablePointMode(false));
        dispatch(setDeleteDraggablePointMode(false));
        transformerSelectElement(selectionType, node);
      } else if (!selectMode && layer === 'modules') {
        onStartChange(id, layer);
        dispatch(toggleModule(id));
        onFinishChange(id, layer);
      }
    },
    [
      dispatch,
      transformerSelectElement,
      selectMode,
      selectedShapeElementIds,
      selectedLayerName,
      layers,
      onStartChange,
      onFinishChange,
    ],
  );

  const onRotateElement = useCallback(
    (id: string, layer: string, pointsRotationInRadians: number[], points: number[][]) =>
      dispatch(
        updateShape({
          ...layers[layer][id],
          shape: {
            ...layers[layer][id].shape,
            points,
            pointsRotationInRadians,
          },
        }),
      ),
    [dispatch, layers],
  );

  const onChangeElementParams = useCallback(
    (id: string, layer: string, params: TransformableElementChangeParams) => {
      if (params && params.points && params.points.length <= 2) {
        dispatch(
          setDeleteDialogParams({
            elementIds: [id],
            layer,
            open: true,
          }),
        );
      } else {
        dispatch(
          updateShape({
            ...layers[layer][id],
            shape: {
              ...layers[layer][id].shape,
              ...params,
            },
          }),
        );
      }
    },
    [dispatch, layers],
  );

  const onMoveStart = useCallback(
    (layer: string, node: Node) => {
      const elementIds: string[] = selectedShapeElementIds.includes(node.id())
        ? Array.from(selectedShapeElementIds)
        : [node.id()];

      dispatch(startHistoryItem(elementIds, layer));

      elementIds.forEach((elementId: string) => {
        dispatch(
          updateShape({
            ...layers[layer][elementId],
            shape: {
              ...layers[layer][elementId].shape,
            },
          }),
        );
      });
    },
    [dispatch, selectedShapeElementIds, layers],
  );

  const onMoveElement = useCallback(
    (id: string, layer: string, node: Node, e: Konva.KonvaEventObject<DragEvent>) => {
      transformerHandleDragElement(node, e);

      if (magnetMode && selectedShapeElementIds.length <= 1) {
        if (layer === 'modules') {
          const line = node as Line;
          const x = line.x();
          const y = line.y();

          const magnetAlignment = getMagnetAlignment(
            {
              ...layers[layer][id],
              shape: {
                ...layers[layer][id].shape,
                points: convertLinePointsToShapePoints(
                  line.points().map((coord: number, index: number) => {
                    if (index % 2 === 0) {
                      return coord + x;
                    } else {
                      return coord + y;
                    }
                  }) as number[],
                ),
              },
            },
            (Object.values(layers[layer]) as SolarElement[]).filter((element: SolarElement) => element.active),
            selectedShapeElementIds,
          );

          if (
            magnetAlignment &&
            difference(magnetAlignment.pointsRotationInRadians, layers[layer][id].shape.pointsRotationInRadians!)
              .length > 0
          ) {
            onChangeElementParams(id, layer, {
              ...magnetAlignment,
              points: magnetAlignment.points!.map(point => [point[0] - x, point[1] - y]),
            });
          }
        }
      }
    },
    [layers, onChangeElementParams, magnetMode, transformerHandleDragElement, selectedShapeElementIds],
  );

  const onMoveEnd = useCallback(
    (layer: string, node: Node) => {
      dispatch(finishHistoryItem(transformerOnDragEnd(layer, node), layer));
    },
    [dispatch, transformerOnDragEnd],
  );

  const onMouseMove = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      if (selectedLayerName.length && newDraggablePointMode) {
        const stage: Stage = event.currentTarget as Stage;
        const masterLayer: Layer = stage
          .getLayers()
          .toArray()
          .find(layer => layer.attrs['id'] === 'layers') as Layer;

        if (masterLayer) {
          const selectedLayer: Group = masterLayer.findOne(`#${selectedLayerName}`) as Group;

          const transform: Transform = selectedLayer.getAbsoluteTransform().copy();
          transform.invert();

          const pointerPosition: Vector2d | null = stage.getPointerPosition();

          if (pointerPosition) {
            const relativePointerPosition: Vector2d = transform.point(pointerPosition);

            dispatch(setMousePosition(relativePointerPosition));
          }
        }
      } else if (mousePosition) {
        dispatch(setMousePosition(undefined));
      }
    },
    [selectedLayerName, newDraggablePointMode, dispatch, mousePosition],
  );

  const onMouseClick = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      if (
        newDraggablePointMode &&
        mousePosition &&
        selectedLayerName.length > 0 &&
        selectedShapeElementIds.length === 1
      ) {
        dispatch(startHistoryItem(selectedShapeElementIds, selectedLayerName));

        dispatch(addNewDraggablePoint(selectedLayerName, selectedShapeElementIds[0], mousePosition));

        dispatch(finishHistoryItem(selectedShapeElementIds, selectedLayerName));
      }
    },
    [newDraggablePointMode, mousePosition, selectedLayerName, selectedShapeElementIds, dispatch],
  );

  useEffect(() => {
    dispatch(setSelectedModuleSpec(solarDesign.modules_spec));

    const lowerCoords: ShapeCoords = getLowerCoords(solarDesign, {
      top: 0,
      left: 150,
    });
    dispatch(setCanvasOrigin(lowerCoords));

    Object.values(solarDesign.layers)
      .reduce((allElements, layer) => {
        return allElements.concat(layer);
      }, [])
      .forEach((solarElement: SolarElement) => {
        if (solarElement.type === 'module') {
          solarElement.shape.pointsRotationInRadians = getCurrentModulePointsRotation(solarElement.shape.points!);
        }
        dispatch(addShape(solarDesign.modules_spec.series, solarElement));
        dispatch(incrementTotalShapes());
      });
  }, [solarDesign, dispatch]);

  useEffect(() => {
    if (stageRef) {
      const container = (stageRef as Stage).container();
      container.tabIndex = 1;
      container.focus();
      container.addEventListener(
        'keyup',
        (e: KeyboardEvent) => {
          if (selectedShapeElementIds.length > 0 && (e.key === 'Backspace' || e.key === 'Delete')) {
            dispatch(
              setDeleteDialogParams({
                elementIds: selectedShapeElementIds,
                layer: selectedLayerName,
                open: true,
              }),
            );
          }
        },
        false,
      );
    }
  }, [dispatch, selectedShapeElementIds, selectedLayerName, stageRef]);

  useEffect(() => {
    if (!selectMode && selectedShapeElementIds.length > 0) {
      selectedShapeElementIds.forEach((elementId: string) => {
        dispatch(setSelectedElement(selectedLayerName, elementId, false));
      });

      dispatch(selectShape('', '', 'reset'));
      dispatch(setNewDraggablePointMode(false));
      dispatch(setDeleteDraggablePointMode(false));
      transformerSelectElement('reset');
    }
  }, [dispatch, transformerSelectElement, selectMode, selectedShapeElementIds, selectedLayerName]);

  return {
    selectElement,
    selectedElementIds: selectedShapeElementIds,
    selectedLayerName,
    scale,
    canvasOrigin,
    onStartChange,
    onChangeElementParams,
    onRotateElement,
    onFinishChange,
    onMoveStart,
    onMoveElement,
    onMoveEnd,
    layersOrder,
    layers,
    newDraggablePointMode: newDraggablePointMode,
    deleteDraggablePointMode,
    mousePosition: mousePosition,
    selectMode: selectMode,
    onMouseMove,
    onMouseClick,
    setDragging,
    dragging,
    stageRef,
    setStageRef,
  };
};

export default useCanvas;
