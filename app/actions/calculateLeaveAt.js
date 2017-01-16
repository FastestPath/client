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
  if (__DEV__) {
   console.error(error);
  }
  dispatch(leaveAtFailure(error));
};

// TODO: only supporting LEAVE_AT for now
const calculateLeaveAt = ({ position, origin, destination, leaveArriveTime = new Date() }) => {
  return (dispatch) => {
    dispatch(leaveAtRequest(origin, destination));

    let walkingTimeSeconds = 0;

    fetchWalkingDirections({
      position,
      destination: Station[destination].location
    })
    .then((response) => {
      walkingTimeSeconds = calculateWalkingTimeSeconds(response.routes);
      const departAt = addSeconds(leaveArriveTime, walkingTimeSeconds);
      return fetchTrainSchedule({ origin, destination, departAt });
    })
    .then((response) => {
      const { arrivals = [] } = response.sequence;
      const firstArrival = arrivals[0];
      if (!firstArrival) {
        throw new Error('No train schedule found.');
      }

      const trainDepartureTime = new Date(firstArrival.departureTime);
      const timeToLeave = calculateTrainDepartureTime(walkingTimeSeconds, trainDepartureTime);

      push.localNotificationSchedule({
        message: 'Time to leave for your train.',
        date: timeToLeave
      });

      dispatch(leaveAtResponse());
    })
    .catch((e) => handleError(e, dispatch));
  }
};

export default calculateLeaveAt;
