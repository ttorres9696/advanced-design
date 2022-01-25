import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore from '../../../../redux/specs/mocks/state.mock';
import SelectTool from '.';

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(
    <Provider store={mockStore}>
      <SelectTool />
    </Provider>,
    {},
  );
});

describe('SelectTool', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
