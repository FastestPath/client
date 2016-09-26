import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PathTimer from '../components/PathTimer';
import * as pathTimerActions from '../actions/pathTimerActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    directions: state.pathTimerReducer.directions
  };
}

function wrapActions(dispatch) {
  return {
    actions: bindActionCreators(pathTimerActions, dispatch)
  };
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { directions, actions } = this.props;

    return (
      <PathTimer
        directions={directions}
        {...actions}
      />
    );
  }
}

export default connect(mapStateToProps, wrapActions)(App);