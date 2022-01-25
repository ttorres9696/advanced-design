import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockSolarDesign from '../../../redux/specs/mocks/solarDesign.mock';
import mockStore from '../../../redux/specs/mocks/state.mock';
import Canvas from '.';
import { CanvasProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: CanvasProps = {
    solarDesign: mockSolarDesign,
    canvasDimension: { width: 333, height: 222 },
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <Canvas {...props} />
    </Provider>,
    {},
  );
});

describe('Canvas', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
