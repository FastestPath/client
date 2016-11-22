import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Router, Route } from './router';

import HomeScreen from './screens/HomeScreen';
import AlertsScreen from './screens/AlertsScreen';

import NavigationDrawer from './components/NavigationDrawer';
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
      </Router>
    );
  }
});

export default FastestPath;
