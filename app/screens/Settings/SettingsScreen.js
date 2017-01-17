import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const stylesheet = StyleSheet.create({
});

const SettingsScreen = React.createClass({

  contextTypes: {
    route: React.PropTypes.string.isRequired
  },

  render() {
    return <Text style={{ textAlign: 'center', color: 'white' }}>Coming soon.</Text>;
  }

});

export default SettingsScreen;
