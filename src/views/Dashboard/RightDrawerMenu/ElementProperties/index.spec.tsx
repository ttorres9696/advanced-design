import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore, { mockSolarElement } from '../../../../redux/specs/mocks/state.mock';
import ElementProperties from '.';
import { ElementPropertiesProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: ElementPropertiesProps = {
    solarElement: mockSolarElement,
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <ElementProperties {...props} />
    </Provider>,
    {},
  );
});

describe('ElementProperties', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
