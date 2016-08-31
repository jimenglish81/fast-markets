import {
  AUTH_SUCCESS,
  UNAUTH_SUCCESS,
  UNAUTH_FAILURE
} from '../actions/types';

export default (lsClient) => (store) => (next) => (action) => {
  if (action.type === AUTH_SUCCESS) {
    const {
      payload: {
        accountId,
        cst,
        lightstreamerEndpoint,
        xst,
      },
    } = action;
    lsClient.connect(
      lightstreamerEndpoint,
      accountId,
      cst,
      xst);
  }

  if ([UNAUTH_SUCCESS, UNAUTH_FAILURE].indexOf(action.type) > -1) {
    lsClient.disconnect();
  }

  next(action);
}
