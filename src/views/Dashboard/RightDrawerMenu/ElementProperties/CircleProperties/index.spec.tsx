import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore, { mockSolarElement } from '../../../../../redux/specs/mocks/state.mock';
import CircleProperties from '.';
import { CirclePropertiesProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: CirclePropertiesProps = {
    x: mockSolarElement.shape.x,
    y: mockSolarElement.shape.y,
    radius: mockSolarElement.shape.radius,
    updateShapeProperty: (attr: string, value: any) => {},
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <CircleProperties {...props} />
    </Provider>,
    {},
  );
});

describe('CircleProperties', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
