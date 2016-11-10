import React from 'react';
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
import formatSeconds from '../utils/formatSeconds';
import {
  backgroundColor,
  padding
} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor
  },
  banner: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding
  },
  welcome: {
    fontFamily: 'enzo',
    fontSize: 26,
    textAlign: 'center',
    color: '#FCFFF7',
    margin: 40,
  },
  instructions: {
    textAlign: 'center',
    color: '#FCFFF7',
    marginBottom: 30,
  },
  button: {
    marginBottom:30
  },
  picker: {
    marginBottom:30
  }
});

const PathTimer = React.createClass({

  watchId: null,

  getInitialState() {
    return {
      currentPosition: null,
      hour: null,
      minute: null,
      presetHour: 12,
      presetMinute: 0,
      selectedStation: null,
      timePromptText: 'Departure Time (optional)',
      stationPromptText: 'Please select your destination'
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
    try {
      const { action, minute, hour } = await TimePickerAndroid.open(options);

      if (action === TimePickerAndroid.timeSetAction) {
        return this.setState({
          timeText: formatHourMinute(hour, minute),
          hour,
          minute
        });
      }

      if (action === TimePickerAndroid.dismissedAction) {
        return this.setState({ timeText: 'dismissed' });
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

    let origin = null;

    if (currentPosition){
      const positionJson = JSON.parse(currentPosition);
      origin = positionJson.coords;
    } else {
      // TODO this is for testing, remove when done, handle error when location not found
      origin = {
          latitude: 40.735,
          longitude: -74.027
      }
    }

    const destinationStation = Station[selectedStation] || Station["DEFAULT"];
    const time = { hour, minute };

    this.props.fetchDirections({origin, destinationStation, time});
  },

  handleStationChange(value) {
    this.setState({ selectedStation: value });
  },

  departText(){
    const {
      hour,
      minute,
      timeText
    } = this.state;

    if (hour && minute){
      return 'Leave at ' + timeText;
    } else {
      return 'Leave ASAP'
    }
  },

  renderTimer() {
    const directions = this.props.directions;
    return (
      <View>
        <Button>
          Cancel
        </Button>
        <Text style={styles.instructions}>
          Leave in {directions.secondsToDeparture} to catch your train
        </Text>
      </View>
    );
  },

  render() {
    const directions = this.props.directions;

    const { selectedStation, stationPromptText } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text>FastestPATH</Text>
        </View>
        <Text>
          Please select your destination
        </Text>
        <StationPicker
          style={styles.picker}
          defaultValue={stationPromptText}
          selectedValue={selectedStation}
          onValueChange={this.handleStationChange}
        />

        <Button
          onPress={ () => this.showPicker({
              hour: this.state.hour || this.state.presetHour,
              minute: this.state.minute || this.state.presetMinute,
            })}
          style={styles.button}
        >
          {this.state.timePromptText}
        </Button>

        <Button
          onPress={this.handleSubmit}
        >
          {this.departText()}
        </Button>

        { directions.secondsToDeparture && this.renderTimer() }

      </View>
    );
  }
});

export default PathTimer;
