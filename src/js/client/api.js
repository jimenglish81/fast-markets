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

// export function restore(cst, xst) {
//   return doGet(`${BASE}session`, createHeaders(cst, xst));
// }

export function unauth(cst, xst) {
  return doDelete(`${BASE}session`, createHeaders(cst, xst));
}

// TODO - sort out traversal
export function getSprints(cst, xst) {
  return doGet(`${BASE}marketnavigation/381909`, createHeaders(cst, xst))
              .then((resp) => console.log(resp.markets));
}
