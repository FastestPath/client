import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../components/Button';
import Hamburger from '../components/Hamburger';
import Label from '../components/Label';
import Layout from '../components/Layout'
import Logo from '../components/Logo';

import {
  dark,
  light,
  backgroundColor,
  margin,
} from '../styles';

const stylesheet = StyleSheet.create({
});

const AlertsScreen = React.createClass({

  render() {
    return <Text style={{ color: 'white' }}>Hello World</Text>;
  }

});

export default AlertsScreen;
