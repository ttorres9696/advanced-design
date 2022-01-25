import RED from '@material-ui/core/colors/red';
import { Circle as CircleType } from 'konva/types/shapes/Circle';
import { Stage } from 'konva/types/Stage';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { Circle } from 'react-konva';

import { DraggablePointProps } from './types';

const DraggablePoint: React.FC<DraggablePointProps> = ({
  x,
  y,
  position,
  onStart,
  onChange,
  onEnd,
  onClick,
  deleteDraggablePointMode,
  invisible,
}) => {
  const shapeRef = useRef<any>();

  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const onDragStart = useCallback((e: any) => onStart(), [onStart]);

  const onDragMove = useCallback(
    (e: any) => {
      const node = shapeRef.current;
      onChange(node.x(), node.y(), position);
    },
    [onChange, shapeRef, position],
  );

  const onDragEnd = useCallback(
    (e: any) => {
      const node = shapeRef.current;
      onEnd(node.x(), node.y(), position);
    },
    [onEnd, shapeRef, position],
  );

  const onClickPoint = useCallback((e: any) => onClick(position), [onClick, position]);

  const onMouseOver = useCallback(
    (e: any) => {
      if (deleteDraggablePointMode) {
        setMouseOver(true);
      }
    },
    [deleteDraggablePointMode, setMouseOver],
  );

  const onMouseOut = useCallback((e: any) => setMouseOver(false), [setMouseOver]);

  const onMouseEnter = useCallback(() => {
    if (shapeRef && shapeRef.current) {
      const node = shapeRef.current as CircleType;
      const stage: Stage | null = node.getStage();

      if (stage) {
        stage.container().style.cursor = deleteDraggablePointMode ? 'pointer' : 'move';
      }
    }
  }, [shapeRef, deleteDraggablePointMode]);

  const onMouseLeave = useCallback(() => {
    if (shapeRef && shapeRef.current) {
      const node = shapeRef.current as CircleType;
      const stage: Stage | null = node.getStage();

      if (stage) {
        stage.container().style.cursor = 'default';
      }
    }
  }, [shapeRef]);

  return (
    <Fragment>
      <Circle
        ref={shapeRef}
        x={x}
        y={y}
        radius={deleteDraggablePointMode && mouseOver ? 7 : 5}
        strokeWidth={0.5}
        tension={0}
        stroke={deleteDraggablePointMode && mouseOver ? RED[500] : '#2db1ff'}
        fill={deleteDraggablePointMode && mouseOver ? RED[50] : '#fff'}
        opacity={1}
        draggable={!deleteDraggablePointMode}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        onClick={onClickPoint}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        visible={!invisible}
      />
    </Fragment>
  );
};

export default React.memo(DraggablePoint);
