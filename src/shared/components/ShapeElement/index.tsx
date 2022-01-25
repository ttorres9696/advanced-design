import { flattenDeep, isNaN, isNil } from 'lodash';
import React from 'react';
import { Circle, Line } from 'react-konva';

import { ShapeElementParams } from './types';

const LineShape = React.forwardRef((params: ShapeElementParams, ref: any) => {
  return (
    <Line
      ref={ref}
      id={params.id}
      name={params.name}
      x={params.x}
      y={params.y}
      strokeWidth={0.5}
      points={flattenDeep(params.points)}
      tension={0}
      closed
      stroke={params.solarType === 'module' ? 'white' : 'black'}
      fill={params.solarType === 'module' ? 'black' : 'lightgray'}
      opacity={!isNil(params.opacity) && !isNaN(params.opacity) ? params.opacity : 1}
      draggable={params.draggable}
      onClick={params.onClick}
      onDragEnd={params.onDragEnd}
      onDragMove={params.onDragMove}
      onDragStart={params.onDragStart}
      onTransformStart={params.onPolygonTransformStart}
      onTransformEnd={params.onPolygonTransformEnd}
      onMouseEnter={params.onMouseEnter}
      onMouseLeave={params.onMouseLeave}
    />
  );
});

const CircularShape = React.forwardRef((params: ShapeElementParams, ref: any) => {
  return (
    <Circle
      ref={ref}
      id={params.id}
      name={params.name}
      x={params.x}
      y={params.y}
      radius={params.radius!}
      strokeWidth={0.5}
      tension={0}
      stroke={params.solarType === 'module' ? 'white' : 'black'}
      fill={params.solarType === 'module' ? 'black' : 'lightgray'}
      opacity={!isNil(params.opacity) && !isNaN(params.opacity) ? params.opacity : 1}
      draggable={params.draggable}
      onClick={params.onClick}
      onDragEnd={params.onDragEnd}
      onDragMove={params.onDragMove}
      onDragStart={params.onDragStart}
      onTransformStart={params.onCircleTransformStart}
      onTransformEnd={params.onCircleTransformEnd}
      onMouseEnter={params.onMouseEnter}
      onMouseLeave={params.onMouseLeave}
    />
  );
});

const ShapeElement = React.forwardRef((params: ShapeElementParams, ref: any) => {
  switch (params.type) {
    case 'circle':
      return <CircularShape {...params} ref={ref} />;

    default:
      return <LineShape {...params} ref={ref} />;
  }
});

export default ShapeElement;
