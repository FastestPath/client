import {DIRECTIONS_REQUEST, DIRECTIONS_RESPONSE} from '../actions/pathTimerActions';

const initialState = {
  directions: {}
};

export default function pathTimerReducer(state = initialState, action = {}) {
  switch (action.type) {
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