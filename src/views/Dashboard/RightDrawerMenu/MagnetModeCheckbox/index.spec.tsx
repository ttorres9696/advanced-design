import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore from '../../../../redux/specs/mocks/state.mock';
import MagnetModeCheckbox from '.';
import { MagnetModeCheckboxProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: MagnetModeCheckboxProps = {
    mode: 'full',
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <MagnetModeCheckbox {...props} />
    </Provider>,
    {},
  );
});

describe('MagnetModeCheckbox', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
