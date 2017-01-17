import { CHANGE_ROUTE } from '../actions/changeRoute';

const initialState = Object.freeze({
  route: 'home',
  params: {}
});

export default function routerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_ROUTE:
      const { route, params } = action;
      return {
        ...state,
        route,
        params
      };
    default:
      return state;
  }
}