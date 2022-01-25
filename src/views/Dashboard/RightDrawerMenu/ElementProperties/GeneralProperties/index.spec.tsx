import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';

import mockStore, { mockSolarElement } from '../../../../../redux/specs/mocks/state.mock';
import GeneralProperties from '.';
import { GeneralPropertiesProps } from './types';

let wrapper: ReactWrapper;

beforeEach(() => {
  const props: GeneralPropertiesProps = {
    azimuth: mockSolarElement.azimuth,
    tilt: mockSolarElement.tilt,
    updateProperty: (attr: string, value: any) => {},
    deleteObject: () => {},
  };

  wrapper = mount(
    <Provider store={mockStore}>
      <GeneralProperties {...props} />
    </Provider>,
    {},
  );
});

describe('GeneralProperties', () => {
  it('renders correctly', () => expect(toJson(wrapper)).toMatchSnapshot());
});
