import Station from 'Station'

export default Object.keys(Station).map(function({ name }) {
  return name;
});
