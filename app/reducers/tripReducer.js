import { SET_TRIP } from '../actions/setTrip';

const initialState = Object.freeze({
  isSet: false,
  origin: undefined,
  destination: undefined,
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

    default:
      return state;
  }
};

export default tripReducer;