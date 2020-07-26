import React from 'react';
import {render} from 'react-native-testing-library';
import {EmptyMessage} from '../../components/EmptyMessage';
import {Location} from 'src/types';

describe('EmptyMessage', () => {
  const renderMessage = (props = {}) => render(<EmptyMessage {...props} />);
  it('renders correctly', () => {
    const {toJSON} = renderMessage();
    expect(toJSON).toMatchSnapshot();
  });

  it('shows no locations text', () => {
    const {getByText} = renderMessage();
    const element = getByText('No locations');
    expect(element.children).toHaveLength(1);
  });
});
