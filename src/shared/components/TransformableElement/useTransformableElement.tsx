import Konva from 'konva';
import { Node } from 'konva/types/Node';
import { Line } from 'konva/types/shapes/Line';
import { Stage } from 'konva/types/Stage';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getCurrentModulePointsRotation } from '../../helpers/modules.helper';
import { getRotatedPoints } from '../../helpers/polygons.helper';
import { convertVector2dToPoint } from '../../helpers/vectors.helper';
import { DraggablePointParams } from './DraggablePoint/types';
import { UseTansfromableElementProps } from './types';

const useTransformableElement = ({
  id,
  layer,
  onStartChange,
  onChange,
  onFinishChange,
  onRotate,
  setDragging,
  version,
  deleteDraggablePointMode,
  onMoveStart,
  onMove,
  onMoveEnd,
  onSelect,
  visible,
  locked,
  selectMode,
}: UseTansfromableElementProps) => {
  const shapeRef = useRef<any>();

  const [inDragMode, setInDragMode] = useState<boolean>(false);
  const [draggablePoints, setDraggablePoints] = useState<DraggablePointParams[]>([]);
  const [previousVersion, setPreviousVersion] = useState<number>(0);

  const defineDraggablePoints = useCallback(
    (shapePoints: number[]) => {
      setDraggablePoints(
        shapePoints.reduce((draggablePoints: DraggablePointParams[], coord: number, index: number) => {
          if (index % 2 === 0) {
            draggablePoints.push({
              x: coord,
              y: shapePoints[index + 1],
              position: index / 2,
            });
          }

          return draggablePoints;
        }, []),
      );
    },
    [setDraggablePoints],
  );

  const onDragStart = useCallback(
    (e: any) => {
      if (typeof e === 'object' && e.type && e.type === 'dragstart') {
        const node = shapeRef.current;

        onMoveStart(layer, node);
        setInDragMode(true);
        setDragging(true);
      }
    },
    [layer, onMoveStart, setInDragMode, setDragging],
  );

  const onDragMove = useCallback(
    (e: any) => {
      if (typeof e === 'object' && e.type && e.type.indexOf('drag') === 0) {
        onMove(id, layer, shapeRef.current, e);
      }
    },
    [id, layer, onMove, shapeRef],
  );

  const onDragEnd = useCallback(
    (e: any) => {
      const node = shapeRef.current;

      onMoveEnd(layer, node);
      setInDragMode(false);
      setDragging(false);
    },
    [layer, shapeRef, setInDragMode, setDragging, onMoveEnd],
  );

  const onPolygonTransformStart = useCallback(() => onStartChange(id, layer), [onStartChange, id, layer]);

  const onPolygonTransformEnd = useCallback(
    (e: any) => {
      const node = shapeRef.current as Line;

      const rotation = node.rotation();
      node.rotate(-1 * rotation);
      node.x(0);
      node.y(0);

      const rotatedPoints = getRotatedPoints(
        rotation,
        draggablePoints.map(draggablePoint => convertVector2dToPoint(draggablePoint)),
      );

      onRotate(id, layer, getCurrentModulePointsRotation(rotatedPoints), rotatedPoints);

      onFinishChange(id, layer);
    },
    [shapeRef, id, layer, draggablePoints, onRotate, onFinishChange],
  );

  const onCircleTransformStart = useCallback(() => onStartChange(id, layer), [onStartChange, id, layer]);

  const onCircleTransformEnd = useCallback(
    (e: any) => {
      const node = shapeRef.current;
      const scaleX = node.scaleX();

      node.scaleX(1);
      node.scaleY(1);
      onChange(id, layer, {
        radius: node.radius() * scaleX,
      });

      onFinishChange(id, layer);
    },
    [onChange, onFinishChange, id, layer, shapeRef],
  );

  const onPolygonChangePointStart = useCallback(() => onStartChange(id, layer), [onStartChange, id, layer]);

  const onPolygonChangePoint = useCallback(
    (x: number, y: number, position: number) => {
      onChange(id, layer, {
        points: draggablePoints.map((draggablePoint: DraggablePointParams, index: number) =>
          index === position ? [x, y] : [draggablePoint.x, draggablePoint.y],
        ),
      });
    },
    [onChange, id, layer, draggablePoints],
  );

  const onPolygonChangePointEnd = useCallback(
    (x: number, y: number, position: number) => {
      setDraggablePoints(
        draggablePoints.map((draggablePoint: DraggablePointParams, index: number) =>
          index === position ? { x, y, position } : draggablePoint,
        ),
      );

      onFinishChange(id, layer);
    },
    [onFinishChange, id, layer, draggablePoints, setDraggablePoints],
  );

  const onPolygonClickPoint = useCallback(
    (position: number) => {
      if (deleteDraggablePointMode && shapeRef && shapeRef.current) {
        onStartChange(id, layer);

        const newDraggablePoints = Array.from(draggablePoints);
        newDraggablePoints.splice(position, 1);

        onChange(id, layer, {
          points: newDraggablePoints.map(draggablePoint => [draggablePoint.x, draggablePoint.y]),
        });

        setDraggablePoints(newDraggablePoints);

        onFinishChange(id, layer);

        const node = shapeRef.current as Node;
        const stage: Stage | null = node.getStage();

        if (stage) {
          stage.container().style.cursor = 'default';
        }
      }
    },
    [
      onChange,
      id,
      layer,
      draggablePoints,
      setDraggablePoints,
      deleteDraggablePointMode,
      onStartChange,
      onFinishChange,
      shapeRef,
    ],
  );

  const onMouseEnter = useCallback(
    (e: any) => {
      const container = e.target.getStage().container();
      container.style.cursor = layer === 'modules' && !selectMode ? 'pointer' : 'default';
    },
    [layer, selectMode],
  );

  const onMouseLeave = useCallback((e: any) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'default';
  }, []);

  const handleOnClickElement = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (shapeRef && shapeRef.current && visible && !locked) {
        onDragStart(id);
        onSelect(id, layer, e.evt.ctrlKey || e.evt.metaKey ? 'add' : 'reset', shapeRef.current as Node);
      }
    },
    [id, layer, shapeRef, onDragStart, onSelect, visible, locked],
  );

  useEffect(() => {
    if (
      (!draggablePoints.length || previousVersion !== version) &&
      shapeRef &&
      shapeRef.current &&
      shapeRef.current.points
    ) {
      defineDraggablePoints(shapeRef.current.points());

      setPreviousVersion(version);
    }
  }, [shapeRef, defineDraggablePoints, draggablePoints.length, previousVersion, setPreviousVersion, version]);

  return {
    shapeRef,
    onDragStart,
    onDragMove,
    onDragEnd,
    onCircleTransformStart,
    onCircleTransformEnd,
    onPolygonTransformStart,
    onPolygonTransformEnd,
    onPolygonChangePointStart,
    onPolygonChangePoint,
    onPolygonChangePointEnd,
    onPolygonClickPoint,
    draggablePoints,
    inDragMode,
    handleOnClickElement,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useTransformableElement;
