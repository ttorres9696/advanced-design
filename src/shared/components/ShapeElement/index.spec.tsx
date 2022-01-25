import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Layer, Stage } from 'react-konva';

import ShapeElement from '.';
import { ShapeElementParams } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: ShapeElementParams = {
    id: 'id',
    x: 0,
    y: 0,
    points: [
      [0, 0],
      [100, 0],
      [100, 100],
    ],
    type: 'polygon',
    visible: true,
    locked: false,
    draggable: true,
    onClick: () => {},
    onDragEnd: (e: any) => {},
    onDragStart: (e: any) => {},
    opacity: 1,
    solarType: 'module',
  };

  wrapper = mount(
    <Stage>
      <Layer>
        <ShapeElement {...props} />
      </Layer>
    </Stage>,
    {},
  );
});

describe('ShapeElement', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
