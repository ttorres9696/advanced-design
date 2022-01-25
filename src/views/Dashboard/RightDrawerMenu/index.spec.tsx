import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore from '../../../redux/specs/mocks/state.mock';
import { DrawerMenuProps } from '../../../shared/models/DrawerMenuProps.interface';
import RightDrawerMenu from '.';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: DrawerMenuProps = {
    opened: true,
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <RightDrawerMenu {...props} />
    </Provider>,
    {},
  );
});

describe('RightDrawerMenu', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
