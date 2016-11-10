import React from 'react';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  bindActionCreators,
  combineReducers
} from 'redux';

import actions from './actions';
import reducers from './reducers';

import HomeScreen from './screens/HomeScreen';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const FastestPath = React.createClass({
  render() {
    const { directions, actions } = this.props;
    return (
      <HomeScreen
        directions={directions}
        {...actions}
      />
    );
  }
});

function mapStateToProps(state) {
  return { directions: state.directionsReducer.directions };
}

function wrapActions(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

const ConnectedFastestPath = connect(mapStateToProps, wrapActions)(FastestPath);

export default function() {
  return (
    <Provider store={store}>
      <ConnectedFastestPath />
    </Provider>
  );
}

