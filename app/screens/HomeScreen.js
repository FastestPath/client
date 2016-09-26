import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TimePickerAndroid,
  TouchableNativeFeedback
} from 'react-native';
import Button from 'react-native-button';
import Station from '../constants/Station';
import StationPicker from '../components/StationPicker';
import formatHourMinute from '../utils/formatHourMinute';

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
  title: {
    fontWeight: '500',
  },
});

const PathTimer = React.createClass({

  watchId: null,

  getInitialState() {
    return {
      currentPosition: 'unknown',
      hour: null,
      minute: null,
      presetHour: 12,
      presetMinute: 0,
      selectedStation: null,
      timePromptText: 'Click to pick the time you\'d like to arrive'
    };
  },

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      const currentPosition = JSON.stringify(position);
      this.setState({ currentPosition });
    });
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  },

  showPicker: async function(options) {
    const { presetHour, presetMinute } = this.state;
    try {
      const { action, minute, hour } = await TimePickerAndroid.open(options);

      if (action === TimePickerAndroid.timeSetAction) {
        return this.setState({
          text: formatHourMinute(hour, minute),
          hour: presetHour,
          minute: presetMinute
        });
      }

      if (action === TimePickerAndroid.dismissedAction) {
        return this.setState({ text: 'dismissed' });
      }

    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  },

  handleSubmit() {
    const {
      currentPosition,
      selectedStation,
      hour,
      minute
    } = this.state;

    const positionJson = JSON.parse(currentPosition);
    const origin = positionJson.coords;
    const destination = Station[selectedStation].location;
    const time = { hour, minute };

    this.props.fetchDirections({origin, destination, time});
  },

  handleStationChange(value) {
    this.setState({ selectedStation: value });
  },

  renderInstructions() {
    const {
      hour,
      minute,
      presetHour,
      presetMinute,
      selectedStation
    } = this.state;

    const stationName = Station[selectedStation].name;
    const arrivalTime = formatHourMinute(hour || presetHour,
      minute || presetMinute);

    return (
      <Text style={styles.instructions}>
        You want to arrive at {stationName} station at {arrivalTime}
      </Text>
    );
  },

  render() {
    const directions = this.props.directions;
    const { selectedStation } = this.state;

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
          onPress={this.showPicker}
        >
          {this.state.timePromptText}
        </Button>

        <StationPicker
          defaultText='Select the PATH station you want to get off at'
          selectedValue={selectedStation}
          onValueChange={this.handleStationChange}
        />

        { selectedStation && this.renderInstructions() }

        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.currentPosition}
        </Text>

        <Button
          onPress={this.handleSubmit}
        >
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
});

export default PathTimer;
