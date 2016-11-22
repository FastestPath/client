import { connect } from 'react-redux';
import _Router from './Router';
import Route from './Route';

const Router = connect((state) => state.route)(_Router);

export { Router, Route };
