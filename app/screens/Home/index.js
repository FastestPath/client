import { connect } from 'react-redux';

import HomeScreen from './HomeScreen';

export default connect((state) => state.directions)(HomeScreen);