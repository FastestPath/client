import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackAndroid,
  TimePickerAndroid,
  ToastAndroid
} from 'react-native';

import Station from '../../constants/Station';
import { DEPARTURE, ARRIVAL } from '../../constants/StationType';
import { LEAVE_AT, ARRIVE_BY } from '../../constants/LeaveArriveType';

import addTrip from '../../actions/addTrip';
import changePosition from '../../actions/changePosition';
import changeStation from '../../actions/changeStation';
import changeLeaveArrive from '../../actions/changeLeaveArrive';
import calculateTrip from '../../actions/calculateTrip';

import Overlay from '../../components/Overlay';
import Button from '../../components/Button';
import Label from '../../components/Label';
import DepartureTime from '../../components/DepartureTime';
import StationPicker from '../../components/StationPicker'

import {
  blue,
  dark,
  light,
  backgroundColor,
  paddingHorizontal,
  paddingVertical,
  margin,
} from '../../styles';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    marginHorizontal: margin
  },
  departureRow: {
    flexDirection: 'row'
  },
  targetRow: {
    backgroundColor: 'white',
    paddingHorizontal,
    paddingVertical,
    marginVertical: margin
  },
  targetDescription: {
    color: 'black' // TODO
  },
  picker: {
    marginBottom: 20
  },
  description: {
    color: 'white'
  },
  stationTitle: {
    color: 'white',
    fontSize: 16
  },
  submitContainer: {
    flex: 1
  }
});

const HomeScreen = React.createClass({

  overlay: null,

  watchId: null,

  propTypes: {
    closestStation: React.PropTypes.string,
    departureStation: React.PropTypes.string,
    arrivalStation: React.PropTypes.string,
    leaveArriveType: React.PropTypes.oneOf([LEAVE_AT, ARRIVE_BY]).isRequired,
    leaveArriveTime: React.PropTypes.instanceOf(Date),
    leaveAt: React.PropTypes.instanceOf(Date),
    position: React.PropTypes.object,
    isFetching: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    return {
      showStationPicker: false,
      selectedStationType: DEPARTURE
    };
  },

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackPress);
  },

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(this.handlePositionChange);
  },

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPress);
    navigator.geolocation.clearWatch(this.watchId);
  },

  showDeparturePicker() {
    this.setState({
      selectedStationType: DEPARTURE,
      showStationPicker: true
    })
  },

  showArrivalPicker() {
    this.setState({
      selectedStationType: ARRIVAL,
      showStationPicker: true
    })
  },

  async showTimePicker(leaveArriveType) {
    const { dispatch } = this.props;
    const { action, hour, minute } = await TimePickerAndroid.open();

    if (action === TimePickerAndroid.timeSetAction) {
      const leaveArriveTime = new Date();
      leaveArriveTime.setHours(hour);
      leaveArriveTime.setMinutes(minute);
      dispatch(changeLeaveArrive(leaveArriveType, leaveArriveTime));
    }
  },

  hideStationPicker() {
    setTimeout(() => this.overlay.close(), 0);
    setTimeout(() => this.setState({ showStationPicker: false }), 500);
  },

  handleBackPress() {
    const { showStationPicker } = this.state;
    if (showStationPicker) {
      this.hideStationPicker();
      return true;
    }
    return false;
  },

  handlePositionChange(position) {
    const { dispatch } = this.props;
    dispatch(changePosition(position));
  },

  handleDepartureSelect(station) {
    const { dispatch } = this.props;
    dispatch(changeStation(station, DEPARTURE));
    this.hideStationPicker();
  },

  handleArrivalSelect(station) {
    const { dispatch } = this.props;
    dispatch(changeStation(station, ARRIVAL));
    this.hideStationPicker();
  },

  handleDepartureTimeClear() {
    const { dispatch, leaveArriveType } = this.props;
    dispatch(changeLeaveArrive(leaveArriveType, null));
  },

  handleSubmit() {
    const {
      dispatch,
      position,
      departureStation,
      arrivalStation,
      leaveArriveTime
    } = this.props;

    if (!position) {
      ToastAndroid.show('Your location is needed.', ToastAndroid.SHORT);
      return;
    }

    dispatch(calculateTrip({
      position,
      origin: departureStation,
      destination: arrivalStation,
      leaveArriveTime // TODO: only support LEAVE_AT for now
    })).then((trip) => {
      dispatch(addTrip(trip))
    })
  },

  render() {
    let {
      position,
      closestStation,
      leaveArriveTime,
      stationType,
      departureStation,
      arrivalStation,
      isFetching
    } = this.props;
    const { selectedStationType, showStationPicker } = this.state;

    // default departure station to closest station if available
    if (!departureStation && closestStation) {
      departureStation = closestStation;
    }

    const submitLabel = position ? 'Find a Train' : 'Waiting on Location';

    const departureStationLabel = departureStation ? Station[departureStation].name : 'Select Departure Station';
    const arrivalStationLabel = arrivalStation ? Station[arrivalStation].name : 'Select Arrival Station';

    const targetLabel = (stationType === ARRIVAL ? 'Arrival' : 'Departure') + ' Time';

    let selectedStation = departureStation;
    let onSelect = (station) => this.handleDepartureSelect(station);
    let stationTitle = 'Select Departure Station';

    if (selectedStationType === ARRIVAL) {
      selectedStation = arrivalStation;
      onSelect = (station) => this.handleArrivalSelect(station);
      stationTitle = 'Select Arrival Station'
    }

    return (
      <View style={stylesheet.container}>

        <Label text={targetLabel}/>
        <View style={stylesheet.departureRow}>
          <Button
            label="Leave At"
            onPress={() => this.showTimePicker(DEPARTURE)}
            style={{
              touchable: {
                flex: 1
              },
              view: {
                marginRight: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }
            }}/>
          <Button
            label="Arrive By"
            onPress={() => this.showTimePicker(ARRIVAL)}
            style={{
              touchable: {
                flex: 1
              },
              view: {
                marginLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: light
              },
              text: { color: dark }
            }}/>
        </View>

        {leaveArriveTime && (
          <DepartureTime
            date={leaveArriveTime}
            type={stationType}
            onClose={this.handleDepartureTimeClear}
          />
        )}

          <Label text="Departure Station"/>
          <Button
            label={departureStationLabel}
            style={{ view: stylesheet.picker }}
            onPress={this.showDeparturePicker}
          />
          <Text style={stylesheet.description}>Closest station is selected by default.</Text>

          <Label text="Arrival Station"/>
          <Button
            label={arrivalStationLabel}
            style={{ view: stylesheet.picker }}
            onPress={this.showArrivalPicker}
          />

        <View style={stylesheet.submitContainer}>
          <Button label={submitLabel} onPress={this.handleSubmit}/>
        </View>

        {showStationPicker && (
          <Overlay ref={(overlay) => this.overlay = overlay}>
            <StationPicker
              selectedStation={selectedStation}
              onSelect={onSelect}
            />
          </Overlay>
        )}

        {isFetching && (
          <Overlay ref={(overlay) => this.overlay = overlay}>
            <Text style={stylesheet.description}>Fetching directions.</Text>
          </Overlay>
        )}

      </View>
    );
  }
});

export default HomeScreen;
