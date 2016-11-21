import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { margin } from '../styles';

const stylesheet = StyleSheet.create({
  view: {
    flexGrow: 0,
    flexDirection: 'row',
    margin
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
  }
});

const Logo = () => {

  return (
    <View style={stylesheet.view}>
      <Text style={[stylesheet.text, stylesheet.fastest]}>Fastest</Text>
      <Text style={[stylesheet.text, stylesheet.path]}>PATH</Text>
    </View>
  );
};

export default Logo;