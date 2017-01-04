import { DIRECTIONS_REQUEST, DIRECTIONS_RESPONSE, DIRECTIONS_FAILURE } from '../actions/fetchDirections';
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
  directions: {},
  isFetching: false
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
        isFetching: true
      };
    case DIRECTIONS_RESPONSE:
      return {
        ...state,
        isFetching: false,
        directions: action.directions
      };
    case DIRECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}