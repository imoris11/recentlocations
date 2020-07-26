import {Home} from '../../containers/Home';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';

Enzyme.configure({adapter: new Adapter()});

const createTestProps = (props?: object) => ({
  fetchUser: jest.fn(),
  user: {},
  ...props,
});

jest.mock('react-redux', () => {
  return {
    connect: jest.fn().mockReturnValue(() => jest.fn()),
  };
});
jest.mock('../../actions/usersActions', () => {
  return {
    fetchUser: jest.fn().mockReturnValue('mock user action'),
  };
});

jest.mock(
  'react-native-localization',
  () =>
    class RNLocalization {
      language = 'en';
      props: any;

      constructor(props: any) {
        this.props = props;
        this.setLanguage(this.language);
      }

      setLanguage(interfaceLanguage: any) {
        this.language = interfaceLanguage;
        if (this.props[interfaceLanguage]) {
          const localizedStrings = this.props[this.language];
          for (const key in localizedStrings) {
            if (localizedStrings.hasOwnProperty(key)) {
              (this as any)[key] = localizedStrings[key];
            }
          }
        }
      }
    },
);

describe('Home', () => {
  const fetchUser = jest.fn();
  const navigate = jest.fn();
  const props: any = createTestProps({
    fetchUser,
    navigation: {
      navigate,
    },
    locations: [],
  });
  const {toJSON} = render(<Home {...props} />);
  it('should call fetchUser', () => {
    expect(fetchUser).toBeCalled();
  });

  it('should match snapshot', () => {
    expect(toJSON()).toMatchSnapshot();
  });

  it('clears store when clear all is clicked', () => {
    const MOCK_FN = jest.fn();
    const {getByText} = render(<Home {...props} clearAllLocations={MOCK_FN} />);
    const element = getByText('Clear All');
    fireEvent(element, 'click');
    expect(MOCK_FN).toHaveBeenCalled();
  });
});

describe('ConnectedHome', () => {
  const mockConnect = require('react-redux').connect;
  const mapStateToProps = mockConnect.mock.calls[0][0];
  it('should map user from state to props', () => {
    const user = {id: '1'};
    const mockState = {users: {user}, locations: {}};
    const props = mapStateToProps(mockState);
    expect(props.user).toEqual(user);
  });
});
