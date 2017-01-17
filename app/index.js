import React from 'react';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';

import reducers from './reducers';

import FastestPath from './FastestPath';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const ConnectedFastestPath = connect((state) => {
  const { global, trip } = state;
  return {
    ...global,
    trip
  };
})(FastestPath);

export default function() {
  return (
    <Provider store={store}>
      <ConnectedFastestPath />
    </Provider>
  );
}

