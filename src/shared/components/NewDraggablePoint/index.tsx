import React, { useRef } from 'react';
import { Circle } from 'react-konva';

import { NewDraggablePointProps } from './types';

const NewDraggablePoint: React.FC<NewDraggablePointProps> = ({ newDraggablePointMode, mousePosition }) => {
  const shapeRef = useRef<any>();

  if (!newDraggablePointMode || !mousePosition) {
    return null;
  }

  return (
    <Circle
      ref={shapeRef}
      x={mousePosition.x}
      y={mousePosition.y}
      radius={5}
      strokeWidth={0.5}
      tension={0}
      stroke="#2db1ff"
      fill="#fff"
      opacity={1}
      draggable
    />
  );
};

export default React.memo(NewDraggablePoint);
