import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Router, Route } from './router';

import NavigationDrawer from './NavigationDrawer';

import HomeScreen from './screens/HomeScreen';
import AlertsScreen from './screens/AlertsScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import SettingsScreen from './screens/SettingsScreen';

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
    height: 50,
    paddingHorizontal: grid,
    paddingVertical: grid,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const FastestPath = React.createClass({

  handleHamburgerPress() {
    this.layout.openDrawer();
  },

  renderContainer(component, dispatch) {
    return (
      <Layout
        dispatch={dispatch}
        ref={(layout) => this.layout = layout}
        renderNavigationView={NavigationDrawer}
        style={stylesheet.layout}
      >
        <View style={stylesheet.toolbar}>
          <Hamburger onPress={this.handleHamburgerPress} />
          <Logo />
        </View>
        {component}
      </Layout>
    );
  },

  render() {
    const { directions, actions } = this.props;
    return (
      <Router container={this.renderContainer}>
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
