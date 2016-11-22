import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  grid
} from '../styles';

const stylesheet = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    marginVertical: grid / 2
  }
});

const Label = ({text}) => {
  return (
    <View>
      <Text style={stylesheet.text}>{text.toUpperCase()}</Text>
    </View>
  );
};

export default Label;