import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';
import { Map } from 'immutable';

export default (state={}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        session: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case UNAUTH_USER:
      return {
        ...state,
        session: null,
        isAuthenticated: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const isAuthenticated = ({ isAuthenticated }) => {
  return !!isAuthenticated;
}
