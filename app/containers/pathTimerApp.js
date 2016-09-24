'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import PathTimer from '../components/PathTimer';
import * as pathTimerActions from '../actions/pathTimerActions';
import { connect } from 'react-redux';

// @connect(state => ({
//   state: state.counter
// }))
class PathTimerApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { directions, actions } = this.props;

    return (
      <PathTimer
        directions={directions}
        {...actions} />
    );
  }
}

export default connect(state => ({
    directions: state.pathTimerReducer.directions
  }),
  (dispatch) => ({
    actions: bindActionCreators(pathTimerActions, dispatch)
  })
)(PathTimerApp);