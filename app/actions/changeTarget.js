export const CHANGE_TARGET = 'CHANGE_TARGET';

export default function(targetDate, targetType) {
  return (dispatch) => {
     dispatch({
      type: CHANGE_TARGET,
      targetDate,
      targetType
    });
  };
}

