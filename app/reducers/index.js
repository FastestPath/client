import globalReducer from './globalReducer';
import routerReducer from './routerReducer';
import alertsReducer from './alertsReducer';
import feedbackReducer from './feedbackReducer';
import leaveAtReducer from './leaveAtReducer';
import settingsReducer from './settingsReducer';
import tripsReducer from './tripsReducer';

export default {
  global: globalReducer,
  route: routerReducer,
  alerts: alertsReducer,
  feedback: feedbackReducer,
  leaveAt: leaveAtReducer,
  settings: settingsReducer,
  trips: tripsReducer
};

