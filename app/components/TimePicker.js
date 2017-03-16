import React from 'react';
import { StyleSheet, Text, TouchableHighlight, ListView, View } from 'react-native';

import { margin, paddingVertical, paddingHorizontal } from '../styles';

import Station from '../constants/Station'

const styles = StyleSheet.create({
  stations: {
    flex: 1
  },
  view: {
    height: 50,
    justifyContent: 'center',
    margin
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  disabled: {
    color: 'gray'
  },
  selected: {
    color: 'yellow' // TODO
  }
});

const rowHasChanged = (left, right) => left !== right;
const dataSource = new ListView.DataSource({ rowHasChanged });
const stations = Object.keys(Station);
const data = dataSource.cloneWithRows(stations);

const TimePicker = ({ selectedStation, disabledStation, onSelect }) => {

  return (
    <ListView
      dataSource={data}
      style={styles.stations}
      renderRow={(station) => (
        <StationItem
          key={station}
          value={station}
          isSelected={station === selectedStation}
          isDisabled={station === disabledStation}
          onSelect={onSelect}
        />
      )}
    />
  );
};

const StationItem = ({ value, isSelected, isDisabled, onSelect }) => {
  const { name } = Station[value];

  if (isDisabled) {
    return (
      <View style={styles.view}>
        <Text style={[styles.text, styles.disabled]}>{name}</Text>
      </View>
    );
  }

  if (isSelected) {
    return (
      <View style={styles.view}>
        <Text style={[styles.text, styles.selected]}>{name}</Text>
      </View>
    );
  }

  return (
    <TouchableHighlight key={value} onPress={() => onSelect(value)}>
      <View style={styles.view}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TimePicker;
