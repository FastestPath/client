export const CHANGE_LEAVE_ARRIVE = 'CHANGE_LEAVE_ARRIVE';

const changeLeaveArrive = (leaveArriveTime, leaveArriveType) => {
  return (dispatch) => {
     dispatch({
      type: CHANGE_LEAVE_ARRIVE,
       leaveArriveType,
       leaveArriveTime
    });
  };
};

export default changeLeaveArrive;
