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

import setTrip from '../../actions/setTrip';
import changePosition from '../../actions/changePosition';
import changeStation from '../../actions/changeStation';
import changeRoute from '../../actions/changeRoute';
import changeLeaveArrive from '../../actions/changeLeaveArrive';
import calculateTrip from '../../actions/calculateTrip';
import getClosestStation from '../../utils/getClosestStation';

import Overlay from '../../components/Overlay';
import Button from '../../components/Button';
import Label from '../../components/Label';
import DepartureTime from '../../components/DepartureTime';
import StationPicker from '../../components/StationPicker';
import StationMap from '../../components/StationMap';

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
    flex: 1,
    flexDirection: 'row'
  },
  mapContainer: {
    flex: 1
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
    marginBottom: 10
  },
  description: {
    color: 'white',
    marginBottom: 5
  },
  stationTitle: {
    color: 'white',
    fontSize: 16
  },
  submitContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
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
      showTimePicker: false,
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
      dispatch(changeLeaveArrive(leaveArriveTime, leaveArriveType));
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
    dispatch(changeLeaveArrive(null, leaveArriveType));
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
      origin: departureStation || getClosestStation(position.latitude, position.longitude),
      destination: arrivalStation,
      leaveArriveTime // TODO: only support LEAVE_AT for now
    })).then((trip) => {
      dispatch(setTrip(trip));
      dispatch(changeRoute('trip'));
    }).catch((e) => {
      ToastAndroid.show('No trips found.', ToastAndroid.SHORT);
      if (__DEV__) {
        console.log('No trips found.', e.stack);
      }
    })
  },

  renderSubmitButton() {
    let {
      position,
      departureStation,
      arrivalStation,
    } = this.props;

    const submitLabel = !position ? 'Waiting on Location' : 'Find a Train';
    const isDisabled = !position || !departureStation || !arrivalStation;

    return (
      <Button
        label={submitLabel}
        disabled={isDisabled}
        onPress={this.handleSubmit}
      />
    );
  },

  render() {
    let {
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


    const departureStationLabel = departureStation ? Station[departureStation].name : 'Select Departure Station';
    const arrivalStationLabel = arrivalStation ? Station[arrivalStation].name : 'Select Arrival Station';

    const targetLabel = (stationType === ARRIVAL ? 'Arrival' : 'Departure') + ' Time';

    let selectedStation = departureStation;
    let disabledStation = arrivalStation;
    let onSelect = (station) => this.handleDepartureSelect(station);
    let stationTitle = 'Select Departure Station';

    if (selectedStationType === ARRIVAL) {
      selectedStation = arrivalStation;
      disabledStation = departureStation;
      onSelect = (station) => this.handleArrivalSelect(station);
      stationTitle = 'Select Arrival Station'
    }

    return (
      <View style={stylesheet.container}>

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

        <Label text={targetLabel}/>
        <View style={stylesheet.departureRow}>
          <Button
            label="Leave In"
            onPress={() => this.showTimePicker(LEAVE_AT)}
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
            onPress={() => this.showTimePicker(ARRIVE_BY)}
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

        <View style={stylesheet.mapContainer}>

          <StationMap
            departureStation={departureStation}
            arrivalStation={arrivalStation}
          />

        </View>

        {leaveArriveTime && (
          <DepartureTime
            date={leaveArriveTime}
            type={stationType}
            onClose={this.handleDepartureTimeClear}
          />
        )}

        <View style={stylesheet.submitContainer}>
          {this.renderSubmitButton()}
        </View>

        {showStationPicker && (
          <Overlay ref={(overlay) => this.overlay = overlay}>
            <StationPicker
              selectedStation={selectedStation}
              disabledStation={disabledStation}
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
