import { ADD_TRIP } from '../actions/addTrip';

const initialState = Object.freeze({
  activeTrip: undefined,
  allTrips: []
});

const tripsReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case ADD_TRIP:
      const { trip } = action;
      const { allTrips } = state;
      return {
        ...state,
        allTrips: allTrips.concat(trip)
      };

    default:
      return state;
  }
};

export default tripsReducer;