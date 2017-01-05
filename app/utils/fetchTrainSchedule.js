const apiRoot = __DEV__ ?
  'http://10.6.76.100:9000/schedule?' :
  'http://api.fastestpath.co/schedule?';

const createScheduleRequest = ({ origin, destination, departAt }) => {
  departAt = departAt.toJSON();
  return apiRoot
    +`from=${origin}`
    +`&to=${destination}`
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