import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

export default (state={}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true, error: null };
    case UNAUTH_USER:
      return { ...state, isAuthenticated: false, };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const isAuthenticated = ({ isAuthenticated }) => {
  return !!isAuthenticated;
}
