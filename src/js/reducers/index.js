import { combineReducers } from 'redux';
import auth, * as fromAuth from './authentication';
import markets from './markets';
import chart from './chart';

const rootReducer = combineReducers({
  auth,
  markets,
  chart,
});

export default rootReducer;

export const isAuthenticated = ({ auth }) => fromAuth.isAuthenticated(auth);
