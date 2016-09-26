import React from 'react';
import { Picker, StyleSheet } from 'react-native';

import Station from '../constants/Station'

function renderStationItems() {
 return Object.keys(Station).map(function(key) {
   const station = Station[key];
   return <Picker.Item label={station.name} value={key} key={key} />
 });
}

const styles = StyleSheet.create({
  container: {
    width: 100
  }
});

const StationPicker = React.createClass({

  propTypes: {
    onValueChange: React.PropTypes.func,
    defaultText: React.PropTypes.string,
    selectedValue: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      onValueChange: function(e) {},
      defaultText: '',
      selectedValue: null
    };
  },

  render() {
    const { selectedValue, defaultText } = this.props;
    return (
      <Picker
        style={styles.container}
        selectedValue={selectedValue || defaultText}
        onValueChange={this.props.onValueChange}
        mode='dropdown'
      >
        { renderStationItems() }
      </Picker>
    );
  }
});

export default StationPicker;
