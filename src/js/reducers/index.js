import { combineReducers } from 'redux';
import auth, * as fromAuth from './authentication';
import markets from './markets';
import chart from './chart';
import trade from './trade';
import ticket from './ticket';
import positions from './positions';

const rootReducer = combineReducers({
  auth,
  markets,
  chart,
  trade,
  ticket,
  positions,
});

export default rootReducer;

export const isAuthenticated = ({ auth }) => fromAuth.isAuthenticated(auth);
