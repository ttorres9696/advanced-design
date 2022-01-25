import { Folder as FolderIcon, Nature as NatureIcon } from '@material-ui/icons';
import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore from '../../../redux/specs/mocks/state.mock';
import DrawerListItem from '.';
import { DrawerListItemProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: DrawerListItemProps = {
    id: 'elements',
    parentId: '',
    icon: <FolderIcon />,
    label: 'Elements',
    action: () => {},
    expanded: true,
    visible: true,
    locked: false,
    subItems: [
      {
        id: 'tree',
        icon: <NatureIcon />,
        parentId: 'elements',
        label: 'Tree',
        action: () => {},
        visible: true,
        locked: false,
      },
    ],
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <DrawerListItem {...props} />
    </Provider>,
    {},
  );
});

describe('DrawerListItem', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
