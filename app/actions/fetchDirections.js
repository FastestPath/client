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
    destination,
    isLoading: true,
  };
};

const fetchDirectionsResponse = (response) => {
  return {
    type: DIRECTIONS_RESPONSE,
    directions: response,
    isLoading: false
  };
};

const fetchDirectionsFailure = (error) => {
  return {
    type: DIRECTIONS_FAILURE,
    error,
    isLoading: false
  };
};

function calculateSecondsToDeparture(trainDepartureTime,walkingDuration){
  let currentDate = new Date();
  let trainDepartureDate = new Date(trainDepartureTime);

  return ((trainDepartureDate.getTime() - currentDate.getTime())/1000 - walkingDuration);
}

const handleError = (error, dispatch) => {
  if (__DEV__) {
   console.error(error);
  }
  dispatch(fetchDirectionsFailure(error));
};

const fetchDirections = ({ position, origin, destination, targetDate = new Date() }) => {
  return (dispatch) => {
    dispatch(fetchDirectionsRequest(origin, destination));

    let walkingTimeSeconds = 0;

    fetchWalkingDirections({
      origin: position,
      destination: Station[destination].location
    })
    .then((response) => {
      walkingTimeSeconds = calculateWalkingTimeSeconds(response.routes);
      const departAt = calculateDepartureTime(walkingTimeSeconds, targetDate);
      return fetchTrainSchedule({ origin, destination, departAt });
    })
    .then((response) => {
      const { arrivals = [] } = response.sequence;
      const firstArrival = arrivals[0];
      if (!firstArrival) {
        throw new Error('No train schedule found.');
      }

      const trainDepartureTime = firstArrival.departureTime;
      const secondsToDeparture = calculateDepartureTime(walkingTimeSeconds, trainDepartureTime);

      const now = new Date();
      const notificationTime = now.setSeconds(now.getSeconds() + secondsToDeparture);

      push.localNotificationSchedule({
        message: 'Time to leave for your train.',
        date: notificationTime
      });

      dispatch(fetchDirectionsResponse({ secondsToDeparture, trainDepartureTime, walkingTimeSeconds }));
    })
    .catch((e) => handleError(e, dispatch));
  }
};

export default fetchDirections;
