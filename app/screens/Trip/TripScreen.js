import React from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import changeRoute from '../../actions/changeRoute';
import clearTrip from '../../actions/clearTrip';

import Button from '../../components/Button';

import Station from '../../constants/Station';

import {
  paddingHorizontal,
  paddingVertical
} from '../../styles';

const TIME_FORMAT = 'h:mm:ss a';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical,
    paddingHorizontal
  },
  stretch: {
    flex: 1
  },
  text: {
    color: 'white'
  }
});

const TripScreen = React.createClass({

  propTypes: {
    origin: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    walkingTimeSeconds: React.PropTypes.number.isRequired,
    leaveAt: React.PropTypes.instanceOf(Date),
    departAt: React.PropTypes.instanceOf(Date),
    arriveAt: React.PropTypes.instanceOf(Date)
  },

  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  handleCancel() {
    const { dispatch } = this.props;
    dispatch(clearTrip());
    dispatch(changeRoute('home'));
  },

  render() {
    const {
      origin,
      destination,
      leaveAt,
      departAt,
      arriveAt
    } = this.props;

    return (
      <View style={stylesheet.container}>
        <Text style={stylesheet.text}>Origin: {Station[origin].name}</Text>
        <Text style={stylesheet.text}>Destination: {Station[destination].name}</Text>
        <Text style={stylesheet.text}>Start walking: {moment(leaveAt).fromNow()}</Text>
        <Text style={stylesheet.text}>Train leaves at: {moment(departAt).format(TIME_FORMAT)}</Text>
        <Text style={stylesheet.text}>Train arrives at: {moment(arriveAt).format(TIME_FORMAT)}</Text>
        <View style={stylesheet.stretch} />
          <Button
            label="Cancel Trip"
            onPress={this.handleCancel}
            style={{
              touchable: {
              },
              view: {
                backgroundColor: 'red'
              }
            }}
          />
      </View>
    );
  }
});

export default TripScreen;
