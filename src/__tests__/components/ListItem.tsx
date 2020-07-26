import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import SingleListItem from '../../components/ListItem';
import {Location} from 'src/types';

describe('Listitem', () => {
  const mockItem = {} as Location;
  const renderItem = (props = {}) =>
    render(<SingleListItem item={mockItem} removeListItem={jest.fn()} {...props} />);

  it('renders correctly', () => {
    const {toJSON} = renderItem();
    expect(toJSON).toMatchSnapshot();
  });

  it('calls remove list item func when removed button is clicked', () => {
    const MOCK_FN = jest.fn();
    const {getByText} = renderItem({removeListItem: MOCK_FN});
    const element = getByText('Remove');
    fireEvent(element, 'click');
    expect(MOCK_FN).toHaveBeenCalled();
  });
});
