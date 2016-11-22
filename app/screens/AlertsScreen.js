import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const stylesheet = StyleSheet.create({
});

const AlertsScreen = React.createClass({

  contextTypes: {
    route: React.PropTypes.string.isRequired
  },

  render() {
    return <Text style={{ color: 'white' }}>Current route: {this.context.route}</Text>;
  }

});

export default AlertsScreen;
