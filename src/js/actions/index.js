import { API_CALL } from '../middlewares/api';
import {
  auth,
  unauth,
  sprints
} from '../client/api';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,

  UNAUTH_REQUEST,
  UNAUTH_SUCCESS,
  UNAUTH_FAILURE,

  MARKETS_REQUEST,
  MARKETS_SUCCESS,
  MARKETS_FAILURE,

  SELECT_MARKET
} from './types';
import { hashHistory, push } from 'react-router';
import connect from '../client/streaming';
//connect(session.lightstreamerEndpoint, session.currentAccountId, session['CST'], session['X-SECURITY-TOKEN']);


export const authUser = (identifier, password) => ({
  [API_CALL]: {
    apiMethod: () => auth(identifier, password),
    authenticated: false,
    types: [AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE],
  },
});

export const unauthUser = () => ({
  [API_CALL]: {
    apiMethod: unauth,
    authenticated: true,
    types: [UNAUTH_REQUEST, UNAUTH_SUCCESS, UNAUTH_FAILURE],
  },
});

export const fetchMarkets = () => ({
  [API_CALL]: {
    apiMethod: sprints,
    authenticated: true,
    types: [MARKETS_REQUEST, MARKETS_SUCCESS, MARKETS_FAILURE],
  },
});

export const selectMarket = (market) => ({
  type: SELECT_MARKET,
  payload: market,
});
