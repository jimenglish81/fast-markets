import { KEY } from '../secret';
import { doGet, doPost } from './request';

const BASE = 'https://web-api.ig.com/gateway/deal/';

export function auth(identifier, password, encryptedPassword=false) {
  const data = {
    identifier,
    password,
    encryptedPassword,
  };
  const headers = {
    'X-IG-API-KEY': KEY,
  };

  return doPost(`${BASE}session`, headers, null, data, ['CST', 'X-SECURITY-TOKEN']);
}

export function getSprints(cst, xst) {
  const headers = {
    'X-IG-API-KEY': KEY,
    'CST': cst,
    'X-SECURITY-TOKEN': xst,
  };

  return doGet(`${BASE}marketnavigation/381909`, headers)
              .then((resp) => console.log(resp.markets));
}
