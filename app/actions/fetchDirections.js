import env from '../../env';
import getClosestStation from '../utils/computeDistance';

export const DIRECTIONS_REQUEST = 'DIRECTIONS_REQUEST';
export const DIRECTIONS_RESPONSE = 'DIRECTIONS_RESPONSE';
export const DIRECTIONS_FAILURE = 'DIRECTIONS_FAILURE';

function fetchDirectionsRequest(origin, destination) {
  return {
    type: DIRECTIONS_REQUEST,
    origin,
    destination
  };
}

function fetchDirectionsResponse(json) {
  return {
    type: DIRECTIONS_RESPONSE,
    directions: json
  };
}

function fetchDirectionsFailure(error) {
  return {
    type: DIRECTIONS_FAILURE,
    error
  };
}

export default function (options) {
  return function (dispatch) {
    const {origin, destination, arrivalTime} = options;

    dispatch(fetchDirectionsRequest(origin, destination));

    const destinationParam = destination.latitude + ',' + destination.longitude;
    const originParam = origin.latitude + ',' + origin.longitude;

    // closestStation.location will be the first destination for the first request
    const closestStation = getClosestStation(origin.latitude, origin.longitude);

    // TODO
    // Make a walking Directions request first, with closestStation as destination

    //const currentDate = new Date();
    //if (arrivalTime.hour && arrivalTime.minute){
    //  currentDate.setHours(arrivalTime.hour);
    //  currentDate.setMinutes(arrivalTime.minute);
    //}

    //const arrivalTimeParam = currentDate.getTime();

    // PARAMS for api
    //   mode: we want this to be walking
    //   origin: latitude, longitude
    //   destination: string for path station

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originParam}&destination=${destinationParam}&mode=walking&key=${env.googleDirectionsAPI}`;

    return fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((json) => {
        const action = fetchDirectionsResponse(json);
        dispatch(action);
      })
      .catch(function(error) {
        dispatch(fetchDirectionsFailure(error));
      })
  }
}

