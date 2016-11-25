import {
  ALERTS_REQUEST, ALERTS_RESPONSE
} from '../actions/fetchAlerts';

const initialState = Object.freeze({
  alerts: [],
  updatedOn: null,
  isLoading: false
});

export default function alertsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ALERTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ALERTS_RESPONSE:
      return {
        ...state,
        alerts: action.alerts,
        updatedOn: new Date(),
        isLoading: false
      };
    default:
      return state;
  }
}