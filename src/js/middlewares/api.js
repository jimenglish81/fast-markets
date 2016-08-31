function callApi(apiMethod, authenticated, sessionStore) {
  const { cst, xst } = sessionStore.read();
  if(authenticated) {
    if (cst && xst) {
      return apiMethod(cst, xst);
    } else {
      return Promise.reject(`Unauthenticated for '${apiMethod.name}'.`);
    }
  } else {
    return apiMethod().then((resp) => {
      if (resp) {
        sessionStore.write({
          cst: resp.cst|| cst,
          xst: resp.xst || xst,
        });
      }
      return resp;
    });
  }

  return
}

export const API_CALL = Symbol('apiCall');

export default (sessionStore) => (store) => (next) => (action) => {
  const apiAction = action[API_CALL];

  if (!apiAction) {
    return next(action);
  }

  const {
    apiMethod,
    types: [requestType, successType, errorType],
    authenticated
  } = apiAction;

  return callApi(apiMethod, authenticated, sessionStore).then(
    (response) =>
      next({
        type: successType,
        payload: response,
      }),
    (error) => next({
      type: errorType,
      error,
    })
  );
}
