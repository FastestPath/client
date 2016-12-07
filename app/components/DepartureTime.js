import React from 'react';
import moment from 'moment';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  dark,
  margin,
  borderRadius,
  paddingVertical,
  paddingHorizontal
} from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: margin,
    paddingVertical,
    paddingHorizontal,
    borderRadius
  },
  descriptionView: {
    flex: 1
  },
  description: {
    color: dark
  },
  close: {
    color: dark
  }
});

const DepartureTime = ({ date, type, onClose}) => {
  const description = (type === 'arrival' ? 'Arrive ' : 'Depart ') + moment(date).fromNow();
  return (
    <View style={styles.container}>
      <View style={styles.descriptionView}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableHighlight onPress={onClose}>
        <Icon
          name="close"
          size={23}
          color="black"
        />
      </TouchableHighlight>
    </View>
  );
};

export default DepartureTime;
