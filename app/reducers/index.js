import globalReducer from './globalReducer';
import routerReducer from './routerReducer';
import alertsReducer from './alertsReducer';
import feedbackReducer from './feedbackReducer';
import leaveAtReducer from './leaveAtReducer';
import settingsReducer from './settingsReducer';
import tripReducer from './tripReducer';

export default {
  global: globalReducer,
  route: routerReducer,
  alerts: alertsReducer,
  feedback: feedbackReducer,
  leaveAt: leaveAtReducer,
  settings: settingsReducer,
  trip: tripReducer
};

