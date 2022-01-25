import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Node } from 'konva/types/Node';
import React from 'react';
import { Layer, Line, Stage } from 'react-konva';

import TransformableElement from '.';
import { TransformableElementChangeParams, TransformableElementProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: TransformableElementProps = {
    id: 'transformable-element-id',
    shapeType: 'polygon',
    layer: 'modules',
    version: 1,
    visible: true,
    locked: false,
    onSelect: (id: string) => {},
    isSelected: true,
    onChange: (id: string, layer: string, params: TransformableElementChangeParams) => {},
    onStartChange: (id: string, layer: string) => {},
    onRotate: (id: string, layer: string, pointsRotationInRadians: number[], points: number[][]) => {},
    onMove: (id: string, layer: string, node: Node) => {},
    onMoveStart: (layer: string, node: Node) => {},
    onMoveEnd: (layer: string, node: Node) => {},
    onFinishChange: (id: string, layer: string) => {},
    deleteDraggablePointMode: false,
    multiple: false,
    setDragging: (dragging: boolean) => {},
    active: true,
    selectMode: true,
  };

  wrapper = mount(
    <Stage>
      <Layer>
        <TransformableElement {...props}>
          <Line x={20} y={20} points={[0, 0, 100, 0, 100, 100]} tension={0} closed stroke="black" fill="lightgray" />
        </TransformableElement>
      </Layer>
    </Stage>,
    {},
  );
});

describe('TransformableElement', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
