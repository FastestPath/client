import push from '../utils/pushNotification';
import addSeconds from '../utils/addSeconds';

import fetchWalkingDirections from '../utils/fetchWalkingDirections';
import fetchTrainSchedule from '../utils/fetchTrainSchedule';

import calculateWalkingTimeSeconds from '../utils/calculateWalkingTimeSeconds';

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
      destination: Station[destination].location
    })
    .then((response) => {
      walkingTimeSeconds = calculateWalkingTimeSeconds(response.routes);
      const departAt = addSeconds(leaveArriveTime, walkingTimeSeconds);
      return fetchTrainSchedule({ origin, destination, departAt });
    })
    .then((response) => {
      // TODO: rename arrivals to legs
      const { arrivals = [] } = response;
      const firstArrival = arrivals[0];
      if (!firstArrival) {
        throw new Error('No train schedule found.');
      }
      const lastArrival = arrivals[arrivals.length - 1];

      const { departureTime } = firstArrival;
      const { arrivalTime } = lastArrival;

      const trainDepartureTime = new Date(departureTime);
      const trainArrivalTime = new Date(arrivalTime);

      const timeToLeave = new Date(trainDepartureTime);
      timeToLeave.setSeconds(trainDepartureTime.getSeconds() - walkingTimeSeconds);

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
