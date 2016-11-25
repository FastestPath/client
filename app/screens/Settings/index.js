import { connect } from 'react-redux';

import SettingsScreen from './SettingsScreen';

export default connect((state) => state.settings)(SettingsScreen);