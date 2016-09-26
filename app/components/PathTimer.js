import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TimePickerAndroid,
  TouchableNativeFeedback
} from 'react-native';

import Button from 'react-native-button';
import Station from '../constants/Station';
import StationNames from '../constants/StationNames'
import formatHourMinute from '../utils/formatHourMinute'

const Item = Picker.Item;

export default class PathTimer extends Component {

  state = {
    presetHour: 12,
    presetMinute: 0,
    timePromptText: 'Click to pick the time you\'d like to arrive',
    pickerMessage: 'Select the PATH station you want to get off at',
    currentPosition: 'unknown',
  };

  showPicker = async (options) => {
    try {
      const { action, minute, hour } = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState['Text'] = formatHourMinute(hour, minute);
        newState['Hour'] = hour;
        newState['Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState['Text'] = 'dismissed';
      }

      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  };

  watchId: ?number = null;

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      var currentPosition = JSON.stringify(position);
      this.setState({currentPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const directions = this.props.directions;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to PATH timer!
        </Text>
        <Text style={styles.instructions}>
          Select which station you'd like to arrive at,
          and what time you'd like to be there.
        </Text>

        <Button
          onPress={this.showPicker.bind(this, {
              hour: this.state.presetHour,
              minute: this.state.presetMinute,
            })}>
          {this.state.timePromptText}
        </Button>

        <Picker
          style={styles.picker}
          selectedValue={this.state.pickerValue || this.state.pickerMessage}
          onValueChange={this.onValueChange.bind(this)}
          mode='dropdown'>
          { Station.map((station, index) => {
            return (
              <Item label={station} value={index} key={index} />
            );
          })}
        </Picker>

        <Text style={styles.instructions}>
          You want to arrive at {Stations[this.state.pickerValue]} station at {formatHourMinute(this.state.Hour || this.state.presetHour, this.state.Minute || this.state.presetMinute)}
        </Text>

        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.currentPosition}
        </Text>

        <Button
          onPress={this.onSubmit.bind(this)}>
          Get ETA
        </Button>
        { directions.status && (
          <Text style={styles.status}>
            Status of API response directions object: {directions.status}
          </Text>
        )}
      </View>
    );
  }

  onValueChange = (value: string) => {
    const newState = {};
    newState['pickerValue'] = value;
    this.setState(newState);
  };

  onSubmit = () => {
    var currentPosition = JSON.parse(this.state.currentPosition);
    const origin = currentPosition.coords;
    const time = {hour: this.state.Hour, minute: this.state.Minute};
    const destination = stationCoordinates[Stations[this.state.pickerValue]];

    this.props.fetchDirections(origin, destination, time);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,
  },
  status: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 30,
  },
  text: {
    color: 'black',
  },
  picker: {
    width: 100,
  },
  title: {
    fontWeight: '500',
  },
});
