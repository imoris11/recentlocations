import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {AppTabParamList} from '../App';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {Location} from '../types';
import {RouteProp} from '@react-navigation/native';
import {EmptyMessage} from '../components/EmptyMessage';

export interface HomeProps {
  locations: Location[];
  navigation: BottomTabNavigationProp<AppTabParamList, 'Home'>;
  route: RouteProp<AppTabParamList, 'Home'>;
}

export class Map extends Component<HomeProps> {
  render() {
    const {locations} = this.props;
    return locations.length ? (
      <MapView
        style={styles.container}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: locations[0]?.lat,
          longitude: locations[0]?.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {locations.map((location: Location, index) => (
          <Marker
            key={location.timestamp + index}
            coordinate={{latitude: location.lat, longitude: location.lng}}
            title={'Recently visited'}
            description={location.formattedAddress}
          />
        ))}
      </MapView>
    ) : (
      <EmptyMessage />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state: any) => {
  return {
    locations: state.locations.locations,
  };
};

export default connect(mapStateToProps, null)(Map);
