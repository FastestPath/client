const calculateDepartureTime = (walkingTimeSeconds, departAt) => {
  const now = new Date();

  const leaveAt = new Date(now);
  leaveAt.setHours(departAt.hour);
  departAt.setMinutes(departAt.minute);

  // TODO: not sure if this is necessary
  // Avoid going back in the past. Add a day if we are in the past.
  if (leaveAt < now) {
    leaveAt.setDate(leaveAt.getDate() + 1);
  }

  leaveAt.setSeconds(leaveAt.getSeconds() + walkingTimeSeconds);
  return leaveAt;
};

export default calculateDepartureTime;