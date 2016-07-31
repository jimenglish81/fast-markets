import { combineReducers } from 'redux';
import { default as auth } from './authentication';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
