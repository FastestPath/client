import getClosestStation from '../utils/getClosestStation';

export const CHANGE_POSITION = 'CHANGE_POSITION';

export default function(position) {
  const { latitude, longitude } = position.coords;
  return function(dispatch) {
    dispatch({
      type: CHANGE_POSITION,
      closestStation: getClosestStation(latitude, longitude),
      position: position.coords
    });
  };
}

