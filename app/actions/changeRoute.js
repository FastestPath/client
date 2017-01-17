export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export default function(route, params) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_ROUTE,
      route,
      params
    });
  };
}

