import React from 'react';
import {render} from 'react-native-testing-library';
import {CurrentLocation} from '../../components/CurrentLocation';
import {CurrentLocationType} from 'src/types';

describe('CurrentLocation', () => {
  const mockData = {} as CurrentLocationType;
  const renderCurrentLocation = (props = {}) =>
    render(<CurrentLocation {...mockData} {...props} />);
  it('renders correctly', () => {
    const {toJSON} = renderCurrentLocation();
    expect(toJSON).toMatchSnapshot();
  });

  it('accurately abbreviates the name', () => {
    const {getByText} = renderCurrentLocation({username: 'Richard Igbiriki'});
    const element = getByText('RI');
    expect(element.children).toHaveLength(1);
  });

  it('returns 0 wrong abbreviations', () => {
    const {queryAllByText} = renderCurrentLocation({username: 'Richard Igbiriki'});
    const element = queryAllByText('RIG');
    expect(element.length).toBe(0);
  });

  it('shows the right formattedAddress', () => {
    const {queryAllByText} = renderCurrentLocation({formattedAddress: 'Bayelsa Nigeria'});
    const element = queryAllByText('Bayelsa Nigeria');
    expect(element.length).toEqual(1);
  });
});
