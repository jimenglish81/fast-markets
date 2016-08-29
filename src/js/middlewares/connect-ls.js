import { AUTH_SUCCESS, UNAUTH_SUCCESS, UNAUTH_FAILURE } from '../actions/types';

// TODO - try to intercept streaming actions  and hand off to callback with dispatching capabilities
export default (lsClient) => (store) => (next) => (action) => {
  if (action.type === AUTH_SUCCESS) {
    const { payload } = action;
    lsClient.connect(
      payload.lightstreamerEndpoint,
      payload.currentAccountId,
      payload.CST,
      payload['X-SECURITY-TOKEN']);
  }

  if ([UNAUTH_SUCCESS, UNAUTH_FAILURE].indexOf(action.type) > -1) {
    lsClient.disconnect();
  }

  next(action);
}
