import globalReducer from './globalReducer';
import routerReducer from './routerReducer';
import alertsReducer from './alertsReducer';
import feedbackReducer from './feedbackReducer';
import settingsReducer from './settingsReducer';
import leaveAtReducer from './leaveAtReducer';

export default {
  global: globalReducer,
  route: routerReducer,
  alerts: alertsReducer,
  feedback: feedbackReducer,
  settings: settingsReducer,
  leaveAt: leaveAtReducer
};

