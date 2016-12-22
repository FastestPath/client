import env from '../../env';

const parseResponse = (response) => {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Bad response from server.');
};

const fetchWalkingDirections = ({ origin, destination, mode = 'walking' }) => {
  const originParam = origin.latitude + ',' + origin.longitude;
  const destinationParam = destination.latitude + ',' + destination.longitude;

  const url = `https://maps.googleapis.com/maps/api/directions/json?`
    + `origin=${originParam}`
    + `&destination=${destinationParam}`
    + `&mode=${mode}`
    + `&key=${env.googleDirectionsAPI}`;

  return fetch(url)
    .then(parseResponse);
};

export default fetchWalkingDirections;
