import { CHANGE_ROUTE } from '../actions/changeRoute';

const initialState = Object.freeze({
  route: 'home'
});

export default function routerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        route: action.route
      };
    default:
      return state;
  }
}