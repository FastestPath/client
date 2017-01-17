import { connect } from 'react-redux';

import TripScreen from './TripScreen';

export default connect((state) => state.trips.activeTrip)(TripScreen);