import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Router, Route } from './router';

import NavigationDrawer from './NavigationDrawer';

import TripScreen from './screens/Trip';
import HomeScreen from './screens/Home';
import AlertsScreen from './screens/Alerts';
import FeedbackScreen from './screens/Feedback';
import SettingsScreen from './screens/Settings';

import Layout from './components/Layout';
import Logo from './components/Logo';
import Hamburger from './components/Hamburger';

import { backgroundColor, grid } from './styles';

const stylesheet = StyleSheet.create({
  layout: {
    backgroundColor
  },
  toolbar: {
    flex: 0,
    paddingHorizontal: grid,
    paddingVertical: grid,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const FastestPath = React.createClass({

  propTypes: {
    trip: React.PropTypes.object,
    isLoading: React.PropTypes.bool.isRequired
  },

  handleHamburgerPress() {
    this.layout.openDrawer();
  },

  renderContainer(component, dispatch) {
    const { trip, isLoading } = this.props;
    return (
      <Layout
        dispatch={dispatch}
        trip={trip}
        ref={(layout) => this.layout = layout}
        NavigationView={NavigationDrawer}
        style={stylesheet.layout}
      >
        <View style={stylesheet.toolbar}>
          <Hamburger onPress={this.handleHamburgerPress} />
          <Logo />
          {isLoading && <ActivityIndicator size="small" />}
        </View>
        {component}
      </Layout>
    );
  },

  render() {
    const { directions, trip = {}, actions } = this.props;
    return (
      <Router container={this.renderContainer}>
        <Route name="trip">
          <TripScreen {...trip} />
        </Route>
        <Route name="home">
          <HomeScreen
            directions={directions}
            {...actions}
          />
        </Route>
        <Route name="alerts">
          <AlertsScreen />
        </Route>
        <Route name="feedback">
          <FeedbackScreen />
        </Route>
         <Route name="settings">
          <SettingsScreen />
        </Route>
      </Router>
    );
  }
});

export default FastestPath;
