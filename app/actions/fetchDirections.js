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

function createGoogleURLFromParams(options){
  const {mode, origin, destination} = options;

  const destinationParam = destination.latitude + ',' + destination.longitude;
  const originParam = origin.latitude + ',' + origin.longitude;

  return `https://maps.googleapis.com/maps/api/directions/json?`
  +`origin=${originParam}`
  +`&destination=${destinationParam}`
  +`&mode=${mode}`
  +`&key=${env.googleDirectionsAPI}`;
}

function createPathURLFromParams(options){
  const {duration, closestStation, destinationStation, arrivalTime} = options;

  const destinationParam = destinationStation.name;
  const originParam = closestStation.name;

  const currentDate = new Date();

  if (arrivalTime.hour && arrivalTime.minute){
    currentDate.setHours(arrivalTime.hour);
    currentDate.setMinutes(arrivalTime.minute);
  }

  const arrivalTimeParam = currentDate.getTime();

  let url = `https://timetopath.com/api/schedule?`
    +`origin=${originParam}`
    +`&destination=${destinationParam}`
    +`&walking_time=${duration}`
    // will we need an API key?
    //+`&key=${env.googleDirectionsAPI}`;

  if(arrivalTime){
    url += `&arrival_time=${arrivalTimeParam}`
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

function fetchNextTrainTime(duration, closestStation, destinationStation, arrivalTime, dispatch) {

  const url = createPathURLFromParams({duration, closestStation, destinationStation, arrivalTime});

  fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((json) => {
      const action = fetchDirectionsResponse({timeToLeave: json.timeToLeave});
      dispatch(action);
    })
    .catch(function(error) {
      dispatch(fetchDirectionsFailure(error));
    })

}

export default function (options) {
  return function (dispatch) {
    const {origin, destinationStation, arrivalTime} = options;

    dispatch(fetchDirectionsRequest(origin, destinationStation));

    const closestStation = getClosestStation(origin.latitude, origin.longitude);

    // PARAMS for Google api
    //   mode: we want this to be walking
    //   origin: latitude, longitude
    //   destination: string for path station
    const url = createGoogleURLFromParams({origin, destination:closestStation.location, mode: 'walking'});

    return fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((json) => {
        const duration = calculateDuration(json);

        // uncomment this once the API is ready
        //fetchNextTrainTime(duration, closestStation, destinationStation, arrivalTime, dispatch);

        const action = fetchDirectionsResponse({duration});
        dispatch(action);
      })
      .catch(function(error) {
        dispatch(fetchDirectionsFailure(error));
      })
  }
}

