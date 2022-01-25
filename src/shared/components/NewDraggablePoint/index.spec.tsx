import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import { Provider } from 'react-redux';

import mockStore from '../../../redux/specs/mocks/state.mock';
import NewDraggablePoint from '.';
import { NewDraggablePointProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: NewDraggablePointProps = {
    mousePosition: {
      x: 0,
      y: 0,
    },
    newDraggablePointMode: true,
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <Stage>
        <Layer>
          <NewDraggablePoint {...props} />
        </Layer>
      </Stage>
    </Provider>,
    {},
  );
});

describe('NewDraggablePoint', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
