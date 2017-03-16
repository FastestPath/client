import React from 'react';

import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import * as firebase from 'firebase';

import reducers from './reducers';

import FastestPath from './FastestPath';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

firebase.initializeApp({
  apiKey: 'AIzaSyDWopn1z_6I3LOxqtSa3W9CvaeOJu_DgXY',
  authDomain: 'fastestpath-148019.firebaseapp.com',
  databaseURL: 'https://fastestpath-148019.firebaseio.com',
  storageBucket: 'fastestpath-148019.appspot.com',
  messagingSenderId: '554548725783'
});

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

