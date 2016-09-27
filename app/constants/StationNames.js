import Station from './Station'

export default Object.values(Station).map(function({ name }) {
  return name;
});
