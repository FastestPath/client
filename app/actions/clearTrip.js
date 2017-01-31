import push from '../utils/createPushNotification';

export const CLEAR_TRIP = 'CLEAR_TRIP';

const clearTrip = () => {
  return (dispatch) => {
    push.cancelAllLocalNotifications();
    dispatch({
      type: CLEAR_TRIP
    });
  }
};

export default clearTrip;
