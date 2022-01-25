import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore from '../../../redux/specs/mocks/state.mock';
import Navbar from '.';
import { NavbarProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: NavbarProps = {
    isRightDrawerOpened: true,
    drawerToggleAction: () => {},
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <Navbar {...props} />
    </Provider>,
    {},
  );
});

describe('Navbar', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
