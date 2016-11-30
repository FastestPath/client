import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TimePickerAndroid,
} from 'react-native';

import Station from '../../constants/Station';

import Overlay from '../../components/Overlay';
import Button from '../../components/Button';
import Label from '../../components/Label';
import StationPicker from '../../components/StationPicker'

import formatHourMinute from '../../utils/formatHourMinute';
import getClosestStation from '../../utils/computeDistance';

import {
  dark,
  light,
  backgroundColor,
  margin,
} from '../../styles';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    margin
  },
  departureRow: {
    flexDirection: 'row'
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
    marginBottom: 20
  }
});

const HomeScreen = React.createClass({

  overlay: null,
  watchId: null,

  propTypes: {
    showPicker: React.PropTypes.bool.isRequired,
    departureStation: React.PropTypes.instanceOf(Station),
    arrivalStation: React.PropTypes.instanceOf(Station)
  },

  getInitialState() {
    return {
      currentPosition: null,
      hour: null,
      minute: null,
      presetHour: 12,
      presetMinute: 0,
      selectedOriginStation: null,
      timePromptText: 'Departure Time (optional)',
      arrivalStationPromptText: 'Please select your destination',
      departureStationPromptText: 'Please select your desired origin',
      closestStation: Station["HOBOKEN"] // TODO testing only!!
    };
  },

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      const currentPosition = JSON.stringify(position);
      this.setState({ currentPosition });

      const positionJson = JSON.parse(currentPosition);
      const coords = positionJson.coords;
      const closestStation = getClosestStation(coords.latitude, coords.longitude)
      this.setState({ closestStation });
    });
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  },

  handleHamburgerPress() {
    this.layout.open();
  },

  showPicker: async function (options) {
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

    } catch ({ code, message }) {
      console.warn(`Error in example: `, message);
    }
  },

  handleSubmit() {
    const {
      currentPosition,
      selectedStation,
      hour,
      minute,
      closestStation,
      selectedOriginStation
    } = this.state;

    let origin = null;

    if (currentPosition) {
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
    const departureTime = { hour, minute };

    this.props.fetchDirections({
      origin,
      closestStation,
      destinationStation,
      departureTime
    });
  },

  // TODO
  handleStationChange(value) {
    this.setState({ selectedStation: value });
  },

  handleOriginStationChange(value) {
    this.setState({ selectedOriginStation: value });
  },

  showDeparturePicker() {
    this.setState({
      selectedStationType: 'departure',
      showPicker: true
    })

  },

  showArrivalPicker() {
    this.setState({
      selectedStationType: 'arrival',
      showPicker: true
    })
  },

  departText(){
    const {
      hour,
      minute,
      timeText
    } = this.state;

    if (hour && minute) {
      return 'Leave at ' + timeText;
    } else {
      return 'Leave ASAP'
    }
  },


  renderTimer() {
    const directions = this.props.directions;
    return (
      <View>
        <Button label="Cancel"/>
        <Text style={stylesheet.instructions}>
          Leave in {directions.secondsToDeparture} to catch your train
        </Text>
      </View>
    );
  },

  handleDepartureSelect(station) {
    this.overlay.close();
    this.setState({ showPicker: false });
  },

  handleArrivalSelect(station) {
    this.overlay.close();
    this.setState({ showPicker: false });
  },

  render() {
    const { departureStation, arrivalStation } = this.props;
    const { selectedStationType, showPicker } = this.state;

    let selectedStation = departureStation;
    let onSelect = (station) => this.handleDepartureSelect(station);

    if (selectedStationType === 'arrival') {
      selectedStation = arrivalStation;
      onSelect = (station) => this.handleArrivalSelect(station);
    }

    return (
      <View style={stylesheet.container}>

        <Label text="Departure Time" />
        <View style={stylesheet.departureRow}>
          <Button
            label="Leave Now"
            style={{
              view: {
                marginRight: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }
            }}/>
          <Button
            label="Arrive At"
            style={{
              view: {
                marginLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: light
              },
              text: { color: dark }
            }}/>
        </View>

        <Label text="Departure Station (Closest selected)"/>

        <Button
          label="Select Departure Station"
          style={{ view: stylesheet.picker }}
          onPress={this.showDeparturePicker}
        />

        <Label text="Arrival Station"/>

        <Button
          label="Select Arrival Station"
          style={{ view: stylesheet.picker }}
          onValueChange={this.showArrivalPicker}
        />

        <Button label="Find a Train" onPress={this.handleSubmit}/>
        {/*<Text>*/}
        {/*Please select your destination*/}
        {/*</Text>*/}
        {/*<StationPicker*/}
        {/*style={stylesheet.picker}*/}
        {/*defaultValue={stationPromptText}*/}
        {/*selectedValue={selectedStation}*/}
        {/*onValueChange={this.handleStationChange}*/}
        {/*/>*/}

        {/*<Button*/}
        {/*onPress={ () => this.showPicker({*/}
        {/*hour: this.state.hour || this.state.presetHour,*/}
        {/*minute: this.state.minute || this.state.presetMinute,*/}
        {/*})}*/}
        {/*style={stylesheet.button}*/}
        {/*>*/}
        {/*{this.state.timePromptText}*/}
        {/*</Button>*/}

        {/*<Button onPress={this.handleSubmit}>*/}
        {/*{this.departText()}*/}
        {/*</Button>*/}

        {/*{ directions.secondsToDeparture && this.renderTimer() }*/}

        {showPicker && (
          <Overlay ref={(overlay) => this.overlay = overlay}>
            <StationPicker
              selectedStation={selectedStation}
              onSelect={onSelect}/>
          </Overlay>
        )}

      </View>
    );
  }
});

export default HomeScreen;
