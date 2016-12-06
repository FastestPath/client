import { DIRECTIONS_REQUEST, DIRECTIONS_RESPONSE } from '../actions/fetchDirections';
import { CHANGE_POSITION } from '../actions/changePosition';
import { CHANGE_TARGET } from '../actions/changeTarget';
import { CHANGE_STATION } from '../actions/changeStation';

const initialState = Object.freeze({
  departureStation: undefined,
  arrivalStation: undefined,
  closestStation: undefined,
  targetType: 'departure', // TODO: constant
  targetDate: undefined,
  position: undefined,
  directions: {}
});

export default function directionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_POSITION:
      return {
        ...state,
        ...action
      };
    case CHANGE_TARGET:
      return {
        ...state,
        ...action
      };
    case CHANGE_STATION:
      return {
        ...state,
        ...action
      };
    case DIRECTIONS_REQUEST:
      return {
        ...state,
      };
    case DIRECTIONS_RESPONSE:
      return {
        ...state,
        directions: action.directions
      };
    default:
      return state;
  }
}