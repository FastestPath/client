const calculateWalkingTimeSeconds = (routes = []) => {
  if (!routes.length) {
    throw new Error('Unable to calculate walking time. No routes exist.');
  }

  const fastestRoute = routes[0];
  return fastestRoute.legs.reduce((acc, leg)  => {
    return acc + leg.duration.value;
  }, 0);
};

export default calculateWalkingTimeSeconds;
