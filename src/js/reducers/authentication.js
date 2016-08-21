import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';
import { Map } from 'immutable';

export default (state={}, { payload, type }) => {
  switch (type) {
    case AUTH_USER:
      return {
        session: payload,
        cst: payload.CST,
        xst: payload['X-SECURITY-TOKEN'],
        isAuthenticated: true,
        error: null,
      };
    case UNAUTH_USER:
      return {
        session: null,
        isAuthenticated: false,
      };
    case AUTH_ERROR:
      return {
        isAuthenticated: false,
        error: payload,
      };
    default:
      return state;
  }
}

export const isAuthenticated = ({ isAuthenticated }) => {
  return !!isAuthenticated;
}
