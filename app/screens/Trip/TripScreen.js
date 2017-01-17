import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
} from '../../styles';

const stylesheet = StyleSheet.create({
});

const TripScreen = React.createClass({

  propTypes: {
    origin: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    leaveAt: React.PropTypes.instanceOf(Date),
    departAt: React.PropTypes.instanceOf(Date),
    arriveAt: React.PropTypes.instanceOf(Date)
  },

  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  render() {
    return (
      <View style={stylesheet.container}>
        <Text>Trip Screen</Text>
      </View>
    );
  }
});

export default TripScreen;
