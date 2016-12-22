import push from '../utils/pushNotification';
import fetchWalkingDirections from '../utils/fetchWalkingDirections';
import calculateWalkingTimeSeconds from '../utils/calculateWalkingTimeSeconds';

import Station from '../constants/Station';

export const DIRECTIONS_REQUEST = 'DIRECTIONS_REQUEST';
export const DIRECTIONS_RESPONSE = 'DIRECTIONS_RESPONSE';
export const DIRECTIONS_FAILURE = 'DIRECTIONS_FAILURE';

const apiRoot = __DEV__ ?
  `http://192.168.1.153:9000/schedule?` :
  'http://api.fastestpath.co/schedule?';

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

function calculateDepartureTime(walkingDuration, desiredDepartureTime){
  const departureDate = new Date();

  if (desiredDepartureTime && desiredDepartureTime.hour && desiredDepartureTime.minute){
    departureDate.setHours(desiredDepartureTime.hour);
    departureDate.setMinutes(desiredDepartureTime.minute);

    const currentDate = new Date();

    // Avoid going back in the past. Add a day if we are in the past.
    if (departureDate < currentDate) {
      departureDate.setDate(departureDate.getDate() + 1);
    }
  }

  const dateString = new Date(departureDate.getTime() + walkingDuration*1000).toISOString();
  return dateString;
}

function calculateSecondsToDeparture(trainDepartureTime,walkingDuration){
  let currentDate = new Date();
  let trainDepartureDate = new Date(trainDepartureTime);

  return ((trainDepartureDate.getTime() - currentDate.getTime())/1000 - walkingDuration);
}

function fetchNextTrainTime(closestStation, destinationStation, departureTime, trainScheduleCallback) {

  const url = createScheduleRequest({ closestStation, destinationStation, departureTime });

  return fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((json) => {
      trainScheduleCallback(json);
    })
    .catch(function(error) {
      trainScheduleCallback({error});
    })
}

const trainScheduleCallback = (response, dispatch) => {
  const { error } = response;
  if (error) {
    dispatch(fetchDirectionsFailure({ error }));
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
    }).then((response) => {
      const walkingTimeSeconds = calculateWalkingTimeSeconds(response.routes);
      const adjustedDepartureTime = calculateDepartureTime(walkingDuration, targetDate);
    })
      .then((json) => {
        return fetchNextTrainTime(origin, destination, adjustedDepartureTime, trainScheduleCallback);
      })
      .catch((e) => handleError(e, dispatch));
  }
};

export default fetchDirections;

