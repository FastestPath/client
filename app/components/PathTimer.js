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

export default class PathTimer extends Component {

  state = {
    currentPosition: 'unknown',
    presetHour: 12,
    presetMinute: 0,
    selectedStation: null,
    timePromptText: 'Click to pick the time you\'d like to arrive',
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

  handleStationChange(value) {
    this.setState({ selectedStation: value });
  }

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
  }

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
          onPress={this.showPicker.bind(this, {
              hour: this.state.presetHour,
              minute: this.state.presetMinute,
            })}>
          {this.state.timePromptText}
        </Button>

        <StationPicker
          defaultText='Select the PATH station you want to get off at'
          selectedValue={selectedStation}
          onValueChange={this.handleStationChange.bind(this)}
        />

        { selectedStation && this.renderInstructions() }

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
  title: {
    fontWeight: '500',
  },
});
