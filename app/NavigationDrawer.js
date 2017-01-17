import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import CloseButton from './components/CloseButton';

import changeRoute from './actions/changeRoute';
import clearTrip from './actions/clearTrip';

import Station from './constants/Station';

import {
  margin,
  paddingVertical,
  paddingHorizontal
} from './styles';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical,
    paddingHorizontal
  },
  textWrapper: {
    flex: 1
  },
  text: {
    fontSize: 16,
    marginLeft: margin,
    color: 'white',
  },
  selected: {
    color: 'yellow'
  },
  spacer: {
   flex: 1
  },
  footer: {
    paddingVertical,
    paddingHorizontal
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)'
  }
});

const NavigationDrawer = React.createClass({

  contextTypes: {
    route: React.PropTypes.string.isRequired
  },

  propTypes: {
    trip: React.PropTypes.object.isRequired,
    closeDrawer: React.PropTypes.func.isRequired
  },

  go(route, params) {
    const { dispatch, closeDrawer } = this.props;
    dispatch(changeRoute(route, params));
    closeDrawer();
  },

  handleTripClose() {
    const { dispatch, closeDrawer } = this.props;
    dispatch(clearTrip());
    closeDrawer();
  },

  render() {
    const { route } = this.context;
    const { trip } = this.props;

    return (
      <View style={stylesheet.container}>
        {trip.isSet ?
          <Item icon="alarm" isSelected={route === 'trip'} onPress={() => this.go('trip')} onClose={this.handleTripClose}>
            To {Station[trip.destination].name}
          </Item> :
          <Item icon="directions-subway" isSelected={route === 'home'} onPress={() => this.go('home')}>Plan a Trip</Item>
        }
        <Item icon="announcement" isSelected={route === 'alerts'} onPress={() => this.go('alerts')}>PATH Alerts</Item>
        <Item icon="thumbs-up-down" isSelected={route === 'feedback'} onPress={() => this.go('feedback')}>Feedback</Item>
        <Item icon="settings" isSelected={route === 'settings'} onPress={() => this.go('settings')}>Settings</Item>
        <View style={stylesheet.spacer} />
        <View style={stylesheet.footer}>
          <Text style={[stylesheet.text, stylesheet.copyright]}>
            Copyright 2016 © Virtuability LLC
          </Text>
        </View>
      </View>
    );
  }
});

const Item = ({ icon, isSelected, onPress, onClose, children }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={stylesheet.item}>
        <Icon name={icon} size={25} color="white" />
        <View style={stylesheet.textWrapper}>
          <Text style={[stylesheet.text, isSelected ? stylesheet.selected : {}]}>{children}</Text>
        </View>
        {onClose && <CloseButton color="white" onPress={onClose} />}
      </View>
    </TouchableHighlight>
  );
};

export default NavigationDrawer;
