import createPushNotification from '../utils/createPushNotification';
import addSeconds from '../utils/addSeconds';

import fetchWalkingDirections from '../utils/fetchWalkingDirections';
import fetchTrainSchedule from '../utils/fetchTrainSchedule';

import calculateWalkingTimeSeconds from '../utils/calculateWalkingTimeSeconds';

import changeRoute from '../actions/changeRoute';

import Station from '../constants/Station';

export const LEAVE_AT_REQUEST = 'LEAVE_AT_REQUEST';
export const LEAVE_AT_RESPONSE = 'LEAVE_AT_RESPONSE';
export const LEAVE_AT_FAILURE = 'LEAVE_AT_FAILURE';

const leaveAtRequest = (origin, destination) => {
  return {
    type: LEAVE_AT_REQUEST,
    origin,
    destination,
    isLoading: true,
  };
};

const leaveAtResponse = () => {
  return {
    type: LEAVE_AT_RESPONSE,
    isLoading: false
  };
};

const leaveAtFailure = (error) => {
  return {
    type: LEAVE_AT_FAILURE,
    error,
    isLoading: false
  };
};

const handleError = (error, dispatch) => {
  dispatch(leaveAtFailure(error));
  return Promise.reject(error);
};

// TODO: only supporting LEAVE_AT for now
const calculateTrip = ({ position, origin, destination, leaveArriveTime = new Date() }) => {
  return (dispatch) => {
    dispatch(leaveAtRequest(origin, destination));

    let walkingTimeSeconds = 0;

    return fetchWalkingDirections({
      position,
      destination: Station[origin].location
    })
    .then((response) => {
      walkingTimeSeconds = calculateWalkingTimeSeconds(response.routes);

      if (__DEV__) {
        console.log('Walking time: ' + walkingTimeSeconds + ' seconds');
      }

      const departAt = addSeconds(leaveArriveTime, walkingTimeSeconds);
      return fetchTrainSchedule({ origin, destination, departAt });
    })
    .then((response) => {
      const { departureTime, departureStation, arrivalTime, arrivalStation, stops = [] } = response;
      if (!departureTime) {
        throw new Error('No train schedule found.');
      }

      const trainDepartureTime = new Date(departureTime);
      const trainArrivalTime = new Date(arrivalTime);

      const timeToLeave = new Date(trainDepartureTime);
      timeToLeave.setSeconds(trainDepartureTime.getSeconds() - walkingTimeSeconds);

      const push = createPushNotification({
        onNotification: (notification) => {
          dispatch(changeRoute('trip'));
        }
      });

      push.localNotificationSchedule({
        message: 'Time to leave for your train.',
        date: timeToLeave
      });

      dispatch(leaveAtResponse());

      return {
        origin,
        destination,
        walkingTimeSeconds,
        leaveAt: timeToLeave,
        departAt: trainDepartureTime,
        arriveAt: trainArrivalTime
      };
    })
    .catch((e) => handleError(e, dispatch));
  }
};

export default calculateTrip;
