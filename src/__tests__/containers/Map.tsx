import React from 'react';
import {render} from 'react-native-testing-library';
import {Map} from '../../containers/Map';
import {Location} from '../../types';
import MapView from 'react-native-maps';
describe('Map', () => {
  const createTestProps = (props?: object) => ({
    fetchUser: jest.fn(),
    user: {},
    ...props,
  });
  const navigate = jest.fn();
  const defaultProps: any = createTestProps({
    navigation: {
      navigate,
    },
    locations: [],
  });

  const renderMap = (props = {}) => render(<Map {...defaultProps} {...props} />);
  it('renders correctly', () => {
    const {toJSON} = renderMap();
    expect(toJSON).toMatchSnapshot();
  });

  it('has empty message when locations is empty', () => {
    const {queryAllByText} = renderMap();
    const element = queryAllByText('No locations');
    expect(element.length).toEqual(1);
  });

  it('does not show no locations when location is available', () => {
    const location: Location = {
      timestamp: 123456,
      lat: 123,
      lng: 1323,
      formattedAddress: 'ABC',
    };
    const locations = [location];

    const {queryAllByText} = renderMap({locations: locations});
    const element = queryAllByText('No locations');
    expect(element.length).toEqual(0);
  });

  it('does not shows map when there are no locations', () => {
    const {queryAllByType} = renderMap();
    const element = queryAllByType(MapView);
    expect(element.length).toEqual(0);
  });

  it('shows map when there are locations', () => {
    const location: Location = {
      timestamp: 123456,
      lat: 123,
      lng: 1323,
      formattedAddress: 'ABC',
    };
    const locations = [location];

    const {queryAllByType} = renderMap({locations: locations});
    const element = queryAllByType(MapView);
    expect(element.length).toEqual(1);
  });
});
