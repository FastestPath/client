import { SET_TRIP } from '../actions/setTrip';
import { CLEAR_TRIP } from '../actions/clearTrip';

const initialState = Object.freeze({
  isSet: false,
  origin: undefined,
  destination: undefined,
  walkingTimeSeconds: undefined,
  leaveAt: undefined,
  departAt: undefined,
  arriveAt: undefined
});

const tripReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case SET_TRIP:
      const { trip } = action;
      return {
        ...state,
        ...trip,
        isSet: true
      };

    case CLEAR_TRIP:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default tripReducer;