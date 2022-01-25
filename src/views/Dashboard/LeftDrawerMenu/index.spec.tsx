import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore from '../../../redux/specs/mocks/state.mock';
import { DrawerMenuProps } from '../../../shared/models/DrawerMenuProps.interface';
import LeftDrawerMenu from '.';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: DrawerMenuProps = {
    opened: true,
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <LeftDrawerMenu {...props} />
    </Provider>,
    {},
  );
});

describe('LeftDrawerMenu', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
