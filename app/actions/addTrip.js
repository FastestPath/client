export const ADD_TRIP = 'ADD_TRIP';

const addTrip = (trip) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TRIP,
      trip
    });
  }
};

export default addTrip;
