import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const EmptyMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No locations</Text>
      <Text style={styles.text}>Activate location to see current locations</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
