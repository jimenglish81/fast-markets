import { API_CALL } from '../middlewares/api';
import {
  auth,
  unauth,
  sprints,
  market
} from '../clients/api';
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

  MARKET_REQUEST,
  MARKET_SUCCESS,
  MARKET_FAILURE,

  SELECT_EPIC,

  MARKET_UPDATE,
} from './types';
import { hashHistory, push } from 'react-router';

export const authUser = (identifier, password) => ({
  [API_CALL]: {
    apiMethod: auth.bind(null, identifier, password),
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

export const fetchMarket = (epic) => ({
  [API_CALL]: {
    apiMethod: market.bind(null, epic),
    authenticated: true,
    types: [MARKET_REQUEST, MARKET_SUCCESS, MARKET_FAILURE],
  },
});

export const selectEpic = (epic) => ({
  type: SELECT_EPIC,
  payload: epic,
});

export const marketUpdate = (epic, updates) => ({
  type: MARKET_UPDATE,
  payload: {
    epic,
    updates,
  },
});
