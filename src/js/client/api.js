import { KEY } from '../secret';
import { doGet, doPost, doDelete } from './request';

const BASE = 'https://web-api.ig.com/gateway/deal/';
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

const parseMarketNavigationResp = ({ markets }) => {
  return markets.map((market) => {
    return _.pick(market, [
      'epic',
      'instrumentName',
      'marketStatus',
    ]);
  });
};

export function auth(identifier, password, encryptedPassword=false) {
  const data = {
    identifier,
    password,
    encryptedPassword,
  };

  return doPost(`${BASE}session`, createHeaders(), null, data, ['CST', 'X-SECURITY-TOKEN']);
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
  return marketNavigation('381909', cst, xst)
          .then(parseMarketNavigationResp);
}

export function market(cst, xst, epic) {
  const headers = {
    ...createHeaders(cst, xst),
    version: 3,
  };
  const url = `${BASE}markets/${epic}`;

  return doGet(url, headers);
}



export function getChartData(cst, xst, epic) {
  const headers = createHeaders(cst, xst);
  const url = `${BASE}chart/snapshot/${epic}/1/SECOND/combined/300?format=json&siteId=igi&locale=en_GB`;

  return doGet(url, headers)
              .then((resp) => console.log(resp));
}
