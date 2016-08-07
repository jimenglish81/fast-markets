import { auth } from '../client/api';
import { LOGIN, AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
import { hashHistory } from 'react-router';

export function requestLogin(identifier, password) {
  return (dispatch) => {
    auth(identifier, password)
      .then((session) => {
        // TODO - persist state? cookie store
        dispatch(login(session));
        // TODO - navigation more central?
        hashHistory.push('sprints');
      }).catch(() => {
        dispatch(authError('Auth failed.'));
      });
  };
}

export function requestLogout() {
  return (dispatch) => {
    const fn = () => {
      dispatch(logout());
    };

    unauth()
      .then(fn)
      .catch(fn);
  };
}

export const login = (session) => ({
  type: AUTH_USER,
  payload: session,
});

export const logout = () => ({
  type: UNAUTH_USER,
});

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}
