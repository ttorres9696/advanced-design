import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Layer, Stage } from 'react-konva';

import DraggablePoint from '.';
import { DraggablePointProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: DraggablePointProps = {
    x: 100,
    y: 100,
    position: 0,
    onChange: (x: number, y: number, position: number) => {},
    onEnd: (x: number, y: number, position: number) => {},
    onStart: () => {},
    onClick: (position: number) => {},
    deleteDraggablePointMode: false,
  };

  wrapper = mount(
    <Stage>
      <Layer>
        <DraggablePoint {...props} />
      </Layer>
    </Stage>,
    {},
  );
});

describe('DraggablePoint', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
