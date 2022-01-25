import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import DeleteElementConfirmationDialog from '.';
import { DeleteElementConfirmationDialogProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: DeleteElementConfirmationDialogProps = {
    open: true,
    callback: (confirmed: boolean) => {},
  };

  wrapper = mount(<DeleteElementConfirmationDialog {...props} />, {});
});

describe('DeleteElementConfirmationDialog', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
