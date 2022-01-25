import React, { Children, cloneElement } from 'react';

import DraggablePoint from './DraggablePoint';
import { DraggablePointParams } from './DraggablePoint/types';
import { TransformableElementProps } from './types';
import useTransformableElement from './useTransformableElement';

const OPACITY_SELECTED = 0.7;
const OPACITY_NOT_SELECTED = 0.5;
const OPACITY_NOT_VISIBLE = 0;
const OPACITY_INACTIVE_MODULE = 0.3;
const OPACITY_INACTIVE_MODULE_IN_SELECT_MODE = 0.1;

const TransformableElement: React.FC<TransformableElementProps> = ({
  id,
  layer,
  children,
  isSelected,
  onSelect,
  onStartChange,
  onChange,
  onRotate,
  onFinishChange,
  onMoveStart,
  onMove,
  onMoveEnd,
  visible,
  locked,
  resizeEnabled,
  shapeType,
  version,
  deleteDraggablePointMode,
  setDragging,
  multiple,
  active,
  selectMode,
}) => {
  const {
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
  } = useTransformableElement({
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
    multiple,
    selectMode,
  });

  let draggable = visible && !locked;
  let transformable = isSelected && visible && !locked;

  let opacity = isSelected && visible ? OPACITY_SELECTED : !visible ? OPACITY_NOT_VISIBLE : OPACITY_NOT_SELECTED;

  if (layer === 'modules' && !active) {
    draggable = false;
    transformable = false;
    opacity = selectMode ? OPACITY_INACTIVE_MODULE_IN_SELECT_MODE : OPACITY_INACTIVE_MODULE;
  }

  return (
    <>
      {Children.map(children, child =>
        cloneElement(child as React.ReactElement<any>, {
          ref: shapeRef,
          draggable,
          onClick: handleOnClickElement,
          onDragStart,
          onDragMove,
          onDragEnd,
          onCircleTransformStart,
          onCircleTransformEnd,
          onPolygonTransformStart,
          onPolygonTransformEnd,
          onMouseEnter,
          onMouseLeave,
          opacity,
        }),
      )}
      {transformable ? (
        <>
          {resizeEnabled && shapeType !== 'circle' && shapeRef && shapeRef.current
            ? draggablePoints.map((draggablePoint: DraggablePointParams) => (
                <DraggablePoint
                  key={draggablePoint.position}
                  x={draggablePoint.x}
                  y={draggablePoint.y}
                  position={draggablePoint.position}
                  onStart={onPolygonChangePointStart}
                  onChange={onPolygonChangePoint}
                  onEnd={onPolygonChangePointEnd}
                  onClick={onPolygonClickPoint}
                  deleteDraggablePointMode={deleteDraggablePointMode}
                  invisible={inDragMode}
                />
              ))
            : null}
        </>
      ) : null}
    </>
  );
};

export default React.memo(TransformableElement);
