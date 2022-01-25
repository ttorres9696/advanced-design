import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Layer, Stage } from 'react-konva';

import RotationArrowIconButton from '.';
import { RotationArrowIconButtonProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: RotationArrowIconButtonProps = {
    x: 100,
    y: 100,
    position: 0,
    onClick: (position: number) => {},
    type: 'left',
    rotation: 0,
  };

  wrapper = mount(
    <Stage>
      <Layer>
        <RotationArrowIconButton {...props} />
      </Layer>
    </Stage>,
    {},
  );
});

describe('RotationArrowIconButton', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
