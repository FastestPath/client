import { LEAVE_AT_REQUEST, LEAVE_AT_RESPONSE, LEAVE_AT_FAILURE } from '../actions/calculateTrip';
import { CHANGE_POSITION } from '../actions/changePosition';
import { CHANGE_LEAVE_ARRIVE } from '../actions/changeLeaveArrive';
import { CHANGE_STATION } from '../actions/changeStation';

import { LEAVE_AT } from '../constants/LeaveArriveType';

const getPosition = () => {
  if (__DEV__) {
    console.log('Using mock location.');
    return {
      latitude: 40.735,
      longitude: -74.027
    };
  }
  return undefined;
};

const initialState = Object.freeze({
  departureStation: undefined,
  arrivalStation: undefined,
  closestStation: undefined,
  leaveArriveType: LEAVE_AT,
  leaveArriveTime: undefined,
  position: getPosition(),
  leaveAt: undefined,
  isFetching: false
});

const leaveAtReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_POSITION:
      return {
        ...state,
        ...action
      };
    case CHANGE_LEAVE_ARRIVE:
      return {
        ...state,
        ...action
      };
    case CHANGE_STATION:
      return {
        ...state,
        ...action
      };
    case LEAVE_AT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LEAVE_AT_RESPONSE:
      return {
        ...state,
        isFetching: false,
        directions: action.directions
      };
    case LEAVE_AT_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default leaveAtReducer;