import createPushNotification from '../utils/createPushNotification';

export const CLEAR_TRIP = 'CLEAR_TRIP';

const clearTrip = () => {
  return (dispatch) => {
    // TODO: this sucks
    createPushNotification().cancelAllLocalNotifications();
    dispatch({
      type: CLEAR_TRIP
    });
  }
};

export default clearTrip;
