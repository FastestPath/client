import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const stylesheet = StyleSheet.create({
});

const FeedbackScreen = React.createClass({

  contextTypes: {
    route: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <View>
        <Text style={{ textAlign: 'center', color: 'white' }}>Coming soon.</Text>
        <Text style={{ textAlign: 'center', color: 'white' }}>Please leave feedback in the app store in the meantime.</Text>
      </View>
    );
  }

});

export default FeedbackScreen;
