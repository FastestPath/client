import push from '../utils/pushNotification';
import fetchWalkingDirections from '../utils/fetchWalkingDirections';
import fetchTrainSchedule from '../utils/fetchTrainSchedule';
import calculateWalkingTimeSeconds from '../utils/calculateWalkingTimeSeconds';
import calculateDepartureTime from '../utils/calculateDepartureTime';

import Station from '../constants/Station';

export const DIRECTIONS_REQUEST = 'DIRECTIONS_REQUEST';
export const DIRECTIONS_RESPONSE = 'DIRECTIONS_RESPONSE';
export const DIRECTIONS_FAILURE = 'DIRECTIONS_FAILURE';

const fetchDirectionsRequest = (origin, destination) => {
  return {
    type: DIRECTIONS_REQUEST,
    origin,
    destination
  };
};

const fetchDirectionsResponse = (response) => {
  return {
    type: DIRECTIONS_RESPONSE,
    directions: response
  };
};

const fetchDirectionsFailure = (error) => {
  return {
    type: DIRECTIONS_FAILURE,
    error
  };
};

function calculateSecondsToDeparture(trainDepartureTime,walkingDuration){
  let currentDate = new Date();
  let trainDepartureDate = new Date(trainDepartureTime);

  return ((trainDepartureDate.getTime() - currentDate.getTime())/1000 - walkingDuration);
}

const trainScheduleCallback = (response, dispatch) => {
  const { error } = response;
  if (error) {
    handleError(error, dispatch);
    return;
  }

  const trainDepartureTime = trainScheduleResponse.sequence.arrivals[0].departureTime;
  const secondsToDeparture = calculateSecondsToDeparture(trainDepartureTime, walkingDuration);

  const now = new Date();
  const notificationTime = now.setSeconds(now.getSeconds() + secondsToDeparture);

  push.localNotificationSchedule({
    message: 'Time to leave for your train.',
    date: notificationTime
  });

  dispatch(fetchDirectionsResponse({ secondsToDeparture, trainDepartureTime, walkingDuration }));
};

const handleError = (e, dispatch) => {
  if (__DEV__) {
   console.error(e)
  }
  dispatch(fetchDirectionsFailure(error));
};

const fetchDirections = ({ position, origin, destination, targetDate }) => {
  return (dispatch) => {
    dispatch(fetchDirectionsRequest(origin, destination));

    fetchWalkingDirections({
      origin: position,
      destination: Station[destination].location
    })
    .then((response) => {
      const walkingTimeSeconds = calculateWalkingTimeSeconds(response.routes);
      const departAt = calculateDepartureTime(walkingTimeSeconds, targetDate);
      return fetchTrainSchedule({ origin, destination, departAt });
    })
    .then((response) => {
      // TODO...
      const departAt = response.departAt;
      return fetchNextTrainTime(origin, destination, adjustedDepartureTime, trainScheduleCallback);
    })
    .catch((e) => handleError(e, dispatch));
  }
};

export default fetchDirections;

