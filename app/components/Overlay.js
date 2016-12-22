import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

import { overlay } from '../styles';

const stylesheet = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: overlay
  }
});

const Overlay = React.createClass({

  propTypes: {
    duration: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      duration: 200
    };
  },

  getInitialState() {
    return {
      offset: new Animated.Value(height)
    }
  },

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: this.props.duration,
      toValue: 0
    }).start();
  },

  close() {
    Animated.timing(this.state.offset, {
      duration: this.props.duration,
      toValue: height
    }).start();
  },

  render() {
    const translateY = { transform: [{ translateY: this.state.offset }] };
    return (
      <Animated.View style={[stylesheet.overlay, translateY]}>
        {this.props.children}
      </Animated.View>
    );
  }

});

export default Overlay;
