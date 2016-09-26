import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  bindActionCreators,
  combineReducers
} from 'redux';

import * as actions from './actions';
import * as reducers from './reducers';

import HomeScreen from './screens/HomeScreen';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

function mapStateToProps(state) {
  return {
    directions: state.directionsReducer.directions
  };
}

function wrapActions(dispatch) {
  return {
    //have to specify the default actions since we're importing from a folder.
    actions: bindActionCreators(actions.default, dispatch)
  }
}

class PathTimer extends Component {
  render() {
   const { directions, actions } = this.props;
   return (
     <HomeScreen
       directions={directions}
       {...actions}
     />
   );
  }
}

const ConnectedPathTimer = connect(mapStateToProps, wrapActions)(PathTimer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedPathTimer />
      </Provider>
    );
  }
}