import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import DeleteObjectButton from '.';
import { DeleteObjectButtonProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: DeleteObjectButtonProps = {
    onDelete: () => {},
    disabled: false,
  };

  wrapper = mount(<DeleteObjectButton {...props} />, {});
});

describe('DeleteObjectButton', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
