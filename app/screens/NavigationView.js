import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  paddingVertical,
  paddingHorizontal
} from '../styles';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
    paddingVertical,
    paddingHorizontal
  },
  text: {
    color: 'white'
  }
});

const NavigationView = () => {
  return (
    <View style={stylesheet.container}>
      <Item>Test</Item>
      <Item>Test</Item>
      <Item>Test</Item>
      <Item>Test</Item>
    </View>
  );
};

const Item = ({ children }) => {
  return (
     <View style={stylesheet.item}>
        <Text style={stylesheet.text}>{children}</Text>
      </View>
  );
};

export default NavigationView;
