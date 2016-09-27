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

function createURLFromParams(options){
  const {mode, origin, destination, arrivalTime} = options;

  const destinationParam = destination.latitude + ',' + destination.longitude;
  const originParam = origin.latitude + ',' + origin.longitude;

  let url = `https://maps.googleapis.com/maps/api/directions/json?`
  +`origin=${originParam}`
  +`&destination=${destinationParam}`
  +`&mode=${mode}`
  +`&key=${env.googleDirectionsAPI}`;

  if(arrivalTime){
    url += `&arrival_time=${arrivalTime}`
  }

  return url;
}

function calculateDuration(json){
  if (json.routes.length){
    return json.routes[0].legs.reduce((prev, next)=>{
      return prev + next.duration.value;
    }, 0)
  } else {
    //no routes available
    return null;
  }
}

export default function (options) {
  return function (dispatch) {
    const {origin, destination, arrivalTime} = options;

    dispatch(fetchDirectionsRequest(origin, destination));

    // closestStation.location will be the first destination for the first request
    const closestStation = getClosestStation(origin.latitude, origin.longitude);

    let url = createURLFromParams({origin, destination:closestStation.location, mode: 'walking'});

    //const currentDate = new Date();
    //if (arrivalTime.hour && arrivalTime.minute){
    //  currentDate.setHours(arrivalTime.hour);
    //  currentDate.setMinutes(arrivalTime.minute);
    //}
    //
    //const arrivalTimeParam = currentDate.getTime();

    // PARAMS for api
    //   mode: we want this to be walking
    //   origin: latitude, longitude
    //   destination: string for path station

    return fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((json) => {
        const duration = calculateDuration(json);

        const action = fetchDirectionsResponse({duration});
        dispatch(action);
      })
      .catch(function(error) {
        dispatch(fetchDirectionsFailure(error));
      })
  }
}

