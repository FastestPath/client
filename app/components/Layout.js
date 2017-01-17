import React from 'react';
import { DrawerLayoutAndroid } from 'react-native';

import { overlay } from '../styles';

const DEFAULTS = Object.freeze({
  drawerWidth: 250,
  drawerPosition: DrawerLayoutAndroid.positions.Left,
  drawerBackgroundColor: overlay,
  renderNavigationView: () => {}
});

const Layout = React.createClass({

  openDrawer() {
    this.layout.openDrawer();
  },

  closeDrawer() {
    this.layout.closeDrawer();
  },

  render() {
    const {
      dispatch,
      trip,
      NavigationView,
      children,
      ...props
    } = this.props;

    const options = {
      ...DEFAULTS,
      ...props,
      ref: (layout) => this.layout = layout,
      renderNavigationView: () => <NavigationView dispatch={dispatch} trip={trip} closeDrawer={this.closeDrawer} />
    };

    return (
      <DrawerLayoutAndroid {...options}>{children}</DrawerLayoutAndroid>
    );
  }
});

export default Layout;
