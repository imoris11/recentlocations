import React from 'react';
import {CurrentLocationType} from '../types';
import {View, Text, StyleSheet} from 'react-native';

export const CurrentLocation = ({username, formattedAddress, timestamp}: CurrentLocationType) => {
  const nameArray = username?.split(' ');
  const abbreviatedName = nameArray && nameArray[0][0] + nameArray[1][0];
  return (
    <View style={styles.currentLocationContainer}>
      <Text style={styles.sectionHeader}>Current Location</Text>
      <View style={styles.currentLocationBody}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{abbreviatedName}</Text>
        </View>
        <View style={styles.location}>
          <Text numberOfLines={1} style={styles.locationText}>
            {formattedAddress}
          </Text>
          <Text style={styles.timeStamp}>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentLocationContainer: {
    marginVertical: 10,
  },

  currentLocationBody: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#ee6723',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: '800',
  },
  location: {
    marginLeft: 10,
    marginRight: 40,
  },
  locationText: {
    fontWeight: '500',
    fontSize: 16,
  },
  timeStamp: {
    color: 'grey',
    marginTop: 2,
  },
  sectionHeader: {
    color: 'grey',
    fontWeight: '600',
  },
});
