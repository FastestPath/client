const apiRoot = __DEV__ ?
  `http://192.168.1.153:9000/schedule?` :
  'http://api.fastestpath.co/schedule?';

const createScheduleRequest = ({ origin, destination, departAt }) => {
  const originParam = origin.value;
  const destinationParam = destination.value;

  return apiRoot
    +`from=${originParam}`
    +`&to=${destinationParam}`
    +`&departAt=${departAt}`;
};

const parseResponse = (response) => {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Bad trip schedule response from server.');
};

const fetchTrainSchedule = ({ origin, destination, departAt }) => {
  const url = createScheduleRequest({ origin, destination, departAt });

  return fetch(url)
    .then(parseResponse);
};

export default fetchTrainSchedule;