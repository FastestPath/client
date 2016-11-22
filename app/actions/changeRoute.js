export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export default function(route) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_ROUTE,
      route
    });
  };
}

