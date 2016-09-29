import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import { KEY } from '../secret';
import { doGet, doPost, doDelete } from './request';

const BASE = 'https://demo-api.ig.com/gateway/deal/';
const createHeaders = (cst, xst) => {
  const headers = {
    'X-IG-API-KEY': KEY,
  };

  if (cst && xst) {
    return {
      ...headers,
      'CST': cst,
      'X-SECURITY-TOKEN': xst,
    };
  }

  return headers;
};

const parseSessionResp = (session) => {
  const {
    currentAccountId: accountId,
    ['CST']: cst,
    lightstreamerEndpoint,
    ['X-SECURITY-TOKEN']: xst,
  } = session;

  return {
    accountId,
    cst,
    lightstreamerEndpoint,
    xst,
  };
};

const parseMarketNavigationResp = ({ markets }) => {
  return markets.map((market) => {
    return _.pick(market, [
      'epic',
      'instrumentName',
      'marketStatus',
    ]);
  });
};

const parseMarketResp = ({ instrument, snapshot, dealingRules }) => {
  return {
    epic: instrument.epic,
    instrumentName: instrument.name,
    marketStatus: snapshot.marketStatus,
    strike: snapshot.bid,
    minDealSize: dealingRules.minDealSize.value,
    minExpiry: instrument.sprintMarketsMinimumExpiryTime / 60,
    maxExpiry: instrument.sprintMarketsMaximumExpiryTime / 60,
  };
};

const parseChartResp = (epic) => ({ prices }) => ({
  epic,
  dataPoints: prices.map(({ snapshotTime: timestamp, closePrice: { bid: price } }) => ({
    timestamp,
    price,
  }))
});

const parsePositions = ({ sprintMarketPositions }) => sprintMarketPositions;

export function auth(identifier, password, encryptedPassword=false) {
  const data = {
    identifier,
    password,
    encryptedPassword,
  };

  return doPost(`${BASE}session`, createHeaders(), null, data, ['CST', 'X-SECURITY-TOKEN'])
        .then(parseSessionResp);
}

export function unauth(cst, xst) {
  return doDelete(`${BASE}session`, createHeaders(cst, xst));
}

// TODO - sort out traversal
// 357975
//    381908
//        381909
function marketNavigation(id, cst, xst) {
  const headers = createHeaders(cst, xst);
  const url = `${BASE}marketnavigation${id ? `/${id}` : ''}`;

  return doGet(url, headers);
}

export function sprints(cst, xst) {
  return marketNavigation('302308', cst, xst)
          .then(parseMarketNavigationResp);
}

export function market(epic, cst, xst) {
  const headers = {
    ...createHeaders(cst, xst),
    version: 3,
  };
  const url = `${BASE}markets/${epic}`;

  return doGet(url, headers)
          .then(parseMarketResp);
}

export function chart(epic, cst, xst) {
  const headers = {
    ...createHeaders(cst, xst),
    version: 2,
  };
  const url = `${BASE}prices/${epic}/SECOND/30`;

  return doGet(url, headers)
          .then(parseChartResp(epic));
}

export function positions(cst, xst) {
  const headers = {
    ...createHeaders(cst, xst),
    version: 2,
  };
  const url = `${BASE}positions/sprintmarkets`;

  return doGet(url, headers)
          .then(parsePositions);
}

export function createTrade(data, cst, xst) {
  const url = `${BASE}positions/sprintmarkets`;

  return doPost(url, createHeaders(cst, xst), null, data);
}
