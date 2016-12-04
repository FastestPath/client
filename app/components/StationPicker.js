import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

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
  selectedText: {
    color: 'yellow' // TODO
  }
});

const StationPicker = ({ selectedStation, onSelect }) => {
  const stations = Object.keys(Station);
  return (
    <View style={styles.stations}>
      {stations.map((value) => {
        return (
          <StationItem
            key={value}
            value={value}
            isSelected={value === selectedStation}
            onSelect={onSelect}
          />
        );
      })}
    </View>
  );
};

const StationItem = ({ value, isSelected, onSelect }) => {
  const { name } = Station[value];

  const viewStyle = isSelected ? [styles.view, styles.selected] : [styles.view];
  const textStyle = isSelected ? [styles.text, styles.selectedText] : [styles.text];

  return (
    <TouchableHighlight key={value} onPress={() => onSelect(value)}>
      <View style={viewStyle}>
        <Text style={textStyle}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default StationPicker;
