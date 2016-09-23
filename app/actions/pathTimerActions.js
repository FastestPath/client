import env from '../../env';

export const DIRECTIONS_REQUEST = 'DIRECTIONS_REQUEST';
export const DIRECTIONS_RESPONSE = 'DIRECTIONS_RESPONSE';
export const DIRECTIONS_FAILURE = 'DIRECTIONS_FAILURE';

export function fetchDirections (origin, destination, arrivalTime) {
  return function (dispatch) {
    dispatch(fetchDirectionsRequest(origin,destination));




    let destinationParam = destination.split(' ');
    destinationParam.push('PATH+station');
    destinationParam = destinationParam.join('+');

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

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originParam}&destination=${destinationParam}&mode=transit&arrival_time=${arrivalTimeParam}&key=${env.googleDirectionsAPI}`;

    return fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((json) => {
        dispatch(fetchDirectionsResponse(json))
      })
      .catch((error) => {
        dispatch(fetchDirectionsFailure(error));
      })
  }
}

const fetchDirectionsRequest = (origin,destination) => {
  return {
    type: DIRECTIONS_REQUEST,
    origin,
    destination
  }
}

const fetchDirectionsResponse = (json) => {
  return {
    type: DIRECTIONS_RESPONSE,
    directions: json
  }
}

const fetchDirectionsFailure = (error) => {
  return {
    type: DIRECTIONS_FAILURE,
    error
  }
}