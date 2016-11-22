import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import changeRoute from '../actions/changeRoute';

import {
  margin,
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
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical,
    paddingHorizontal
  },
  text: {
    fontSize: 16,
    marginLeft: margin,
    color: 'white',
  },
  spacer: {
   flex: 1
  },
  footer: {
    paddingVertical,
    paddingHorizontal
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)'
  }
});

const NavigationDrawer = (dispatch) => {

  const go = (route) => dispatch(changeRoute(route));

  return (
    <View style={stylesheet.container}>
      <Item icon="directions-subway" onPress={() => go('home')}>Plan a Trip</Item>
      <Item icon="announcement" onPress={() => go('alerts')}>PATH Alerts</Item>
      <Item icon="thumbs-up-down" onPress={() => go('feedback')}>Feedback</Item>
      <Item icon="settings" onPress={() => go('settings')}>Settings</Item>
      <View style={stylesheet.spacer}/>
      <View style={stylesheet.footer}>
        <Text style={[stylesheet.text, stylesheet.copyright]}>
          Copyright 2016 © Virtuability LLC
        </Text>
      </View>
    </View>
  );
};

const Item = ({ icon, onPress, children }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={stylesheet.item}>
        <Icon name={icon} size={25} color="white"/>
        <Text style={stylesheet.text}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default NavigationDrawer;
