import { auth, unauth, restore } from '../client/api';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';
import { hashHistory, push } from 'react-router';
import connect from '../client/streaming';

export function requestAuthUser(identifier, password) {
  return (dispatch) => {
    return auth(identifier, password)
      .then((session) => {

        connect(session.lightstreamerEndpoint, session.currentAccountId, session['CST'], session['X-SECURITY-TOKEN']);
        dispatch(authUser(session));
        return session;
      }).catch(() => {
        dispatch(authError('Auth failed.'));
      });
  };
}

export function requestRestoreUser(cst, xst) {
  return (dispatch) => {
    restore(cst, xst)
      .then((session) => {
        dispatch(authUser(session));
      }).catch(() => {
        dispatch(authError('Auth failed.'));
      });
  };
}

export function requestUnauthUser(cst, xst) {
  return (dispatch) => {
    const fn = () => {
      dispatch(unauthUser());
    };

    unauth(cst, xst)
      .then(fn)
      .catch(fn);
  };
}

export const authUser = (session) => ({
  type: AUTH_USER,
  payload: session,
});

export const unauthUser = () => ({
  type: UNAUTH_USER,
});

export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error,
});
