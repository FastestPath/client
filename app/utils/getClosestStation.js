import Station from '../constants/Station';

const R = 6371e3; // Earth's radius, meters

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// haversine formula
function computeDistance(lat1, lon1, lat2, lon2) {
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);

  const deltaPhi = toRadians((lat2-lat1));
  const deltaLambda = toRadians((lon2-lon1));

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c);
}

export default function(lat, lon){
  let min = null;
  let closestStation = null;

  Object.keys(Station).forEach((stationKey) => {
      const station = Station[stationKey];
      const dist = computeDistance(lat, lon, station.location.latitude, station.location.longitude);
      min = min || dist;
      closestStation = closestStation || station;
      if (dist < min){
        min = dist;
        closestStation = station;
      }
  });

  return closestStation.value;
}
