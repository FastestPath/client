export const SET_TRIP = 'SET_TRIP';

const addTrip = (trip) => {
  return (dispatch) => {
    dispatch({
      type: SET_TRIP,
      trip
    });
  }
};

export default addTrip;
