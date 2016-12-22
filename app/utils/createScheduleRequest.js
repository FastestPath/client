
const createScheduleRequest = ({ origin, destination, departureTime }) => {
  const originParam = origin.value;
  const destinationParam = destination.value;

  return apiRoot
    +`from=${originParam}`
    +`&to=${destinationParam}`
    +`&departAt=${departureTime}`;
};
/**
 * Created by john on 12/21/16.
 */
