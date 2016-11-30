export const ALERTS_REQUEST = 'ALERTS_REQUEST';
export const ALERTS_RESPONSE = 'ALERTS_RESPONSE';

const URL = 'http://api.fastestpath.co/alerts';

function fetchAlertsRequest() {
  return {
    type: ALERTS_REQUEST,
    isLoading: true
  };
}

function fetchAlertsResponse(response) {
  return {
    type: ALERTS_RESPONSE,
    alerts: response,
    isLoading: false
  };
}

export default function() {
  return (dispatch) => {
    dispatch(fetchAlertsRequest());

    return fetch(URL).then((response) => {

      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      response.json().then((json) => dispatch(fetchAlertsResponse(json)));
    });
  }
}

