import { connect } from 'react-redux';

import AlertsScreen from './AlertsScreen';

export default connect((state) => state.alerts)(AlertsScreen);