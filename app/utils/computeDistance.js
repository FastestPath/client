import Station from '../constants/Station';

function toRadians(degrees) {
  return degrees * (Math.PI/180);
};

function computeDistance(lat1, lon1, lat2, lon2) {
  var R = 6371e3; // meters
  var phi1 = toRadians(lat1);
  var phi2 = toRadians(lat2);
  var deltaPhi = toRadians((lat2-lat1));
  var deltaLambda = toRadians((lon2-lon1));

  var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return (R * c);
};

export default function getClosestStation(lat, lon){
  var min = null;
  var closestStation = null;

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

  return closestStation;
};


