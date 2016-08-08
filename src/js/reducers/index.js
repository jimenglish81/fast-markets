import { combineReducers } from 'redux';
import auth, * as fromAuth from './authentication';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;

export const isAuthenticated = ({ auth }) => fromAuth.isAuthenticated(auth);
