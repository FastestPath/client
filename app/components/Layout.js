import React from 'react';
import { DrawerLayoutAndroid } from 'react-native';

import { overlay } from '../styles';

const DEFAULTS = Object.freeze({
  drawerWidth: 250,
  drawerPosition: DrawerLayoutAndroid.positions.Left,
  drawerBackgroundColor: overlay,
  renderNavigationView: () => {}
});

const Layout = ({ children, ...props }) => {
  const options = {
    ...DEFAULTS,
    ...props
  };

  console.log(options.renderNavigationView);

  return (
    <DrawerLayoutAndroid {...options}>{children}</DrawerLayoutAndroid>
  );
};

export default Layout;
