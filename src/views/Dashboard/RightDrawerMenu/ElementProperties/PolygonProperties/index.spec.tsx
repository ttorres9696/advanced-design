import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore, { mockSolarElement } from '../../../../../redux/specs/mocks/state.mock';
import PolygonProperties from '.';
import { PolygonPropertiesProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: PolygonPropertiesProps = {
    points: mockSolarElement.shape.points,
    updateShapeProperty: (attr: string, value: any) => {},
    deletePoint: (index: number) => {},
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <PolygonProperties {...props} />
    </Provider>,
    {},
  );
});

describe('PolygonProperties', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
