import {fetchUser} from '../actions/usersActions';
import {fetchLocation, clearAllLocations, removeLocation} from '../actions/locationActions';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {AppTabParamList} from '../App';
import {User, SingleItem, Location} from '../types';
import SingleListItem from '../components/ListItem';
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';
import {convertTimestampToDate} from '../helpers';
import {CurrentLocation} from '../components/CurrentLocation';

export interface HomeProps {
  fetchUser: typeof fetchUser;
  user: User;
  locations: Location[];
  navigation: BottomTabNavigationProp<AppTabParamList, 'Home'>;
  route: RouteProp<AppTabParamList, 'Home'>;
  fetchLocation: typeof fetchLocation;
  clearAllLocations: typeof clearAllLocations;
  removeLocation: typeof removeLocation;
}

export class Home extends Component<HomeProps> {
  state = {
    watchId: 0,
  };
  componentDidMount() {
    this.props.fetchUser('1');
    this.getLocation();
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow WeHaul to use your location',
          message:
            'WeHaul needs to use your location for trip tracking ' +
            'so you can keep the customer updated on your progress.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  getLocation = () => {
    const accessGranted = Platform.OS === 'ios' ? true : this.requestLocationPermission();
    if (accessGranted) {
      const watchId = Geolocation.watchPosition(
        this.distanceChangedSuccessfully,
        this.distanceChangeFailed,
        {enableHighAccuracy: true, distanceFilter: 100},
      );
      this.setState({watchId});
    }
  };

  distanceChangedSuccessfully = (position: GeolocationResponse) => {
    const coords = `${position.coords.latitude},${position.coords.longitude}`;
    this.props.fetchLocation(coords);
  };

  distanceChangeFailed = (error: GeolocationError) => {
    //do something eith error?
    console.log(error);
  };

  componentWillUnmount() {
    Geolocation.clearWatch(this.state.watchId);
  }

  removeListItem = (payload: number) => {
    this.props.removeLocation(payload);
  };

  _renderItem = ({item}: SingleItem) => {
    return (
      <SingleListItem
        key={item.timestamp}
        removeListItem={(timeStamp: number) => this.removeListItem(timeStamp)}
        item={item}
      />
    );
  };

  clearStore = () => {
    this.props.clearAllLocations();
  };

  _keyExtractor = (item: Location) => {
    return `${item.timestamp}`;
  };

  render() {
    const {locations, user} = this.props;
    const recentLocation = locations[0] || [];
    const timestamp = convertTimestampToDate(recentLocation.timestamp);
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Location Manager</Text>
          </View>
          <CurrentLocation
            timestamp={timestamp || ''}
            formattedAddress={recentLocation.formattedAddress || 'Enable Location Services'}
            username={user?.name}
          />
          <View style={styles.listContainer}>
            <Text style={styles.sectionHeader}>Previous Locations</Text>
            <FlatList
              keyExtractor={(item) => `${item.timestamp}`}
              data={locations}
              renderItem={this._renderItem}
            />
          </View>
          <TouchableOpacity style={styles.clearAllContainer} onPress={() => this.clearStore()}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.users.user,
  locations: state.locations.locations,
});

const mapDispatchToProps = {
  fetchUser,
  fetchLocation,
  clearAllLocations,
  removeLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  headerContainer: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionHeader: {
    color: 'grey',
    fontWeight: '600',
  },
  clearAllContainer: {
    backgroundColor: '#0e64ef',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    left: 20,
    right: 20,
    borderRadius: 3,
    padding: 15,
  },
  clearAllText: {
    color: '#FFF',
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
  },
});
