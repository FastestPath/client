import env from '../../env';

export const DIRECTIONS_REQUEST = 'DIRECTIONS_REQUEST';
export const DIRECTIONS_RESPONSE = 'DIRECTIONS_RESPONSE';
export const DIRECTIONS_FAILURE = 'DIRECTIONS_FAILURE';

export function fetchDirections (origin, destination, arrivalTime) {
  return function (dispatch) {
    dispatch(fetchDirectionsRequest(origin,destination));

    const destinationParam = destination.latitude + ',' + destination.longitude;
    const originParam = origin.latitude + ',' + origin.longitude;
    const currentDate = new Date();
    if (arrivalTime.hour && arrivalTime.minute){
      currentDate.setHours(arrivalTime.hour);
      currentDate.setMinutes(arrivalTime.minute);
    }
    const arrivalTimeParam = currentDate.getTime();

    //PARAMS for api
    // mode: we want this to be transit since its for trains
    // origin: latitude,longitude
    // destination: string for path station
    // arrival_time: seconds since Jan 1 1970 UTC

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originParam}&destination=${destinationParam}&mode=walking&key=${env.googleDirectionsAPI}`;

    return fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((json) => {
        const action = fetchDirectionsResponse(json)
        dispatch(action);
      })
      .catch((error) => {
        dispatch(fetchDirectionsFailure(error));
      })
  }
}

export const fetchDirectionsRequest = (origin,destination) => {
  return {
    type: DIRECTIONS_REQUEST,
    origin,
    destination
  }
}

export const fetchDirectionsResponse = (json) => {
  return {
    type: DIRECTIONS_RESPONSE,
    directions: json
  }
}

export const fetchDirectionsFailure = (error) => {
  return {
    type: DIRECTIONS_FAILURE,
    error
  }
}