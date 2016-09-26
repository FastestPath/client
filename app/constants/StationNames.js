import Station from './Station'

const StationNames = Object.values(Station).map(function({ name }) {
  return name;
});

export default StationNames;
