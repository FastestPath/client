import push from '../utils/pushNotification';

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
