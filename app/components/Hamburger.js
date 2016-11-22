import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { margin } from '../styles';

const stylesheet = StyleSheet.create({
  container: {
    flex: 0,
    marginRight: margin
  }
});

const Hamburger = ({ onPress = () => {} }) => {

  return (
    <View style={stylesheet.container}>
      <TouchableHighlight onPress={onPress}>
        <Icon
          name="menu"
          size={23}
          color="white"
        />
      </TouchableHighlight>
    </View>
  );
};

export default Hamburger;
