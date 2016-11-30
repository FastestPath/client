import globalReducer from './globalReducer';
import routerReducer from './routerReducer';
import alertsReducer from './alertsReducer';
import directionsReducer from './directionsReducer';

export default {
  global: globalReducer,
  route: routerReducer,
  alerts: alertsReducer,
  directions: directionsReducer
};

