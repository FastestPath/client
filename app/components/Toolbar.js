import React from 'react';
import {
  StyleSheet,
  ToolbarAndroid
} from 'react-native';

const stylesheet = StyleSheet.create({
  toolbar: {
    backgroundColor: 'blue'
  }
});

const colorProps = {
  titleColor: 'white',
  subtitleColor: 'white'
};

const Toolbar = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    logo: React.PropTypes.object,
    actions: React.PropTypes.array,
    onActionSelected: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      title: '',
      logo: null,
      actions: [],
      onActionSelected: (position) => {},
      style: {}
    }
  },

  render() {
    const { title, logo, actions, onActionSelected, children, style } = this.props;
    return (
      <ToolbarAndroid
        title={title}
        logo={logo}
        actions={actions}
        onActionSelected={onActionSelected}
        style={[stylesheet.toolbar, style]}
        colorProps={colorProps}
      >
        {children}
      </ToolbarAndroid>
    );
  }
});

export default Toolbar;
