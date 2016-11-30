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
    width: 200,
    color: "white"
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
    const { selectedValue, defaultValue } = this.props;

    return (
      <Picker
        style={styles.container}
        selectedValue={selectedValue}
        onValueChange={this.props.onValueChange}
        prompt={defaultValue}
      >
        { renderStationItems() }
      </Picker>
    );
  }
});

export default StationPicker;
