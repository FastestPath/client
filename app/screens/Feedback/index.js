import { connect } from 'react-redux';

import FeedbackScreen from './FeedbackScreen';

export default connect((state) => state.feedback)(FeedbackScreen);