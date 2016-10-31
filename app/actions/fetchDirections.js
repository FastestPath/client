import env from '../../env';
import getClosestStation from '../utils/computeDistance';
import PushNotification from '../utils/pushNotification';

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
  const {closestStation, destinationStation, departureTime} = options;

  const destinationParam = destinationStation.value;
  const originParam = closestStation.value;

  //TODO Change this url when the server is live
  let url = `http://192.168.1.153:9000/api/schedule?`
    +`from=${originParam}`
    +`&to=${destinationParam}`
    +`&departAt=${departureTime}`

  console.log(url);
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

function calculateDepartureTime(walkingDuration, desiredDepartureTime){
  const currentDate = new Date();

  if (desiredDepartureTime && desiredDepartureTime.hour && desiredDepartureTime.minute){
    currentDate.setHours(desiredDepartureTime.hour);
    currentDate.setMinutes(desiredDepartureTime.minute);
  }

  // Add the walking trip time to the departure time
  currentDate.setSeconds(currentDate.getSeconds() + walkingDuration);
  return currentDate.toISOString();
}

function calculateSecondsToDeparture(trainDepartureTime,walkingDuration){
  let currentDate = new Date();
  let trainDepartureDate = new Date(trainDepartureTime);

  return (trainDepartureDate.getTime() - currentDate.getTime() - walkingDuration);
}

function fetchNextTrainTime(closestStation, destinationStation, departureTime, trainScheduleCallback) {

  const url = createPathURLFromParams({closestStation, destinationStation, departureTime});

  return fetch(url)
  //return fetch('http://192.168.1.153:9000/api/schedule?from=WORLD_TRADE_CENTER&to=JOURNAL_SQUARE&departAt=2016-10-31T23:03:27.845Z')
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

export default function (options) {
  return function (dispatch) {
    const {origin, destinationStation, departureTime} = options;

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
        const walkingDuration = calculateDuration(json);

        //PushNotification.localNotificationSchedule({
        //  message: "Its time to leave for your train!!",
        //  date: new Date(Date.now() + (2 * 1000)) // in 2 secs
        //});

        const trainScheduleCallback = (trainScheduleResponse) => {
          let action = null;
          if (trainScheduleResponse.error){
            action = fetchDirectionsFailure({error: trainScheduleResponse.error})
          }else {
            const trainDepartureTime = trainScheduleResponse.sequence.arrivals[0].departureTime;
            const secondsToDeparture = calculateSecondsToDeparture(trainDepartureTime, walkingDuration);
            action = fetchDirectionsResponse({secondsToDeparture});
          }

          dispatch(action);
        };

        const adjustedDepartureTime = calculateDepartureTime(walkingDuration, departureTime)
        return fetchNextTrainTime(closestStation, destinationStation, adjustedDepartureTime, trainScheduleCallback);
      })
      .catch(function(error) {
        console.log(error);
        dispatch(fetchDirectionsFailure(error));
      })
  }
}

