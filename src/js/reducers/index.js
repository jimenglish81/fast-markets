import { combineReducers } from 'redux';
import auth, * as fromAuth from './authentication';
import markets from './markets';

const rootReducer = combineReducers({
  auth,
  markets,
});

export default rootReducer;

export const isAuthenticated = ({ auth }) => fromAuth.isAuthenticated(auth);
