import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const stylesheet = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 18
  },
  fastest: {},
  path: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24
  },
  beta: {
    fontSize: 12,
    lineHeight: 18
  }
});

const Logo = () => {

  return (
    <View style={stylesheet.view}>
      <Text style={[stylesheet.text, stylesheet.fastest]}>Fastest</Text>
      <Text style={[stylesheet.text, stylesheet.path]}>PATH</Text>
      <Text style={[stylesheet.text, stylesheet.beta]}> beta</Text>
    </View>
  );
};

export default Logo;