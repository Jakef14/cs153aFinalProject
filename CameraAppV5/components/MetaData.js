import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Temperature, Location, Weather, CameraDevice, Time, Date } from './ExpandableValues';


const MetaData = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={styles.dataRow}>
        <View style={{ flex: 1 }}>
          <CameraDevice />
        </View>
        <View style={{ flex: 1 }}>
          <Weather />
        </View>
        <View style={{ flex: 1 }}>
          <Date />
        </View>
      </View>
      <View style={styles.dataRow}>
        <View style={{ flex: 1 }}>
          <Location />
        </View>
        <View style={{ flex: 1 }}>
          <Temperature />
        </View>
        <View style={{ flex: 1 }}>
          <Time />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataRow: {
    flex: 2,
    flexDirection: 'row',
  },
});

export default MetaData;
