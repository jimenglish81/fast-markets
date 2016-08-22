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
export function getSprints(cst, xst) {
  // const headers = createHeaders(cst, xst);
  //
  // doGet(`${BASE}marketnavigation`, headers)
  //   .then(() => )
  // return doGet(`${BASE}marketnavigation/381909`, createHeaders(cst, xst))
  //             .then((resp) => console.log(resp.markets));
}

export function getChartData(cst, xst, epic) {
  const headers = createHeaders(cst, xst);
  const url = `${BASE}chart/snapshot/${epic}/1/SECOND/combined/300?format=json&siteId=igi&locale=en_GB`;

  return doGet(url, headers)
              .then((resp) => console.log(resp));
}
