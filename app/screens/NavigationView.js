import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

const NavigationView = () => {
  return (
    <View style={stylesheet.container}>
      <Icon name="menu" size={30} color="#900" />
      <Text style={{ color: 'blue' }}>Testing the drawer</Text>
    </View>
  );
};

export default NavigationView;
