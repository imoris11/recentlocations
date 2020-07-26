import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem} from 'src/types';
import {convertTimestampToDate} from '../helpers';

export const SingleListItem = ({item, removeListItem}: ListItem) => {
  return (
    <View style={styles.container} key={item.timestamp}>
      <View style={styles.bodyContainer}>
        <Text numberOfLines={1} style={styles.locationText}>
          {item.formattedAddress}
        </Text>
        <Text style={styles.timeStamp}>{convertTimestampToDate(item.timestamp)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => removeListItem(item.timestamp)} style={styles.button}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleListItem;

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  location: {
    marginLeft: 10,
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
  buttonContainer: {
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    borderRadius: 3,
    paddingHorizontal: 10,
    height: 30,
  },
  container: {
    marginTop: 20,
    flexDirection: 'row',
  },
});
