import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TimePickerAndroid
} from 'react-native';

import NavigationView from './NavigationView';

import Station from '../constants/Station';
import Button from '../components/Button';
import Layout from '../components/Layout'
import Logo from '../components/Logo';
import Toolbar from '../components/Toolbar';
import StationPicker from '../components/StationPicker';

import formatHourMinute from '../utils/formatHourMinute';
import formatSeconds from '../utils/formatSeconds';

import {
  dark,
  backgroundColor,
  margin,
} from '../styles';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  },
  banner: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    margin
  },
  departureRow: {
    flexDirection: 'row',
  },

  welcome: {
    fontFamily: 'enzo',
    fontSize: 26,
    textAlign: 'center',
    margin: 40
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 30
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
        <Button label="Cancel" />
        <Text style={stylesheet.instructions}>
          Leave in {directions.secondsToDeparture} to catch your train
        </Text>
      </View>
    );
  },

  render() {
    const directions = this.props.directions;

    const { selectedStation, stationPromptText } = this.state;

    return (
      <Layout
        renderNavigationView={NavigationView}
      >
        <View style={stylesheet.container}>
          <Toolbar><Logo /></Toolbar>
          <View style={stylesheet.departureRow}>
            <Button label="Leave Now"/>
            <Button
              label="Arrive At"
              style={{
                view: { backgroundColor: '#EFF' },
                text: { color: dark }
              }}/>
          </View>
          <Text>
            Please select your destination
          </Text>
          <StationPicker
            style={stylesheet.picker}
            defaultValue={stationPromptText}
            selectedValue={selectedStation}
            onValueChange={this.handleStationChange}
          />

          <Button
            onPress={ () => this.showPicker({
              hour: this.state.hour || this.state.presetHour,
              minute: this.state.minute || this.state.presetMinute,
            })}
            style={stylesheet.button}
          >
            {this.state.timePromptText}
          </Button>

          <Button onPress={this.handleSubmit}>
            {this.departText()}
          </Button>

          { directions.secondsToDeparture && this.renderTimer() }

        </View>
      </Layout>
    );
  }
});

export default PathTimer;
