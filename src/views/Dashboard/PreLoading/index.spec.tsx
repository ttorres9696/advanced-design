import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore from '../../../redux/specs/mocks/state.mock';
import PreLoading from '.';

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(
    <Provider store={mockStore}>
      <PreLoading />
    </Provider>,
    {},
  );
});

describe('PreLoading', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
