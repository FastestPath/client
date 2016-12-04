export const CHANGE_STATION = 'CHANGE_STATION';

function changeStation(station, type) {
  const stationObject = type === 'arrival' ?
      { arrivalStation: station } :
      { departureStation: station };

  return {
    type: CHANGE_STATION,
    ...stationObject
  };
}

export default function(station, type) {
  return (dispatch) => {
    dispatch(changeStation(station, type));
  };
}

