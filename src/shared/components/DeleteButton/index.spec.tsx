import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import DeleteButton from '.';

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(<DeleteButton />, {});
});

describe('DeleteButton', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
