// TODO - move to store/session object.
let cst;
let xst;

function callApi(apiMethod, authenticated) {
  if(authenticated) {
    if (cst && xst) {
      return apiMethod(cst, xst);
    } else {
      return Promise.reject(`Unauthenticated for '${apiMethod.name}'.`);
    }
  } else {
    return apiMethod().then((resp) => {
      if (resp) {
        cst = resp['CST'] || cst;
        xst = resp['X-SECURITY-TOKEN'] || xst;
      }
      return resp;
    });
  }

  return
}

export const API_CALL = Symbol('apiCall');

export default (store) => (next) => (action) => {
  const apiAction = action[API_CALL];

  if (!apiAction) {
    return next(action);
  }

  const {
    apiMethod,
    types: [requestType, successType, errorType],
    authenticated
  } = apiAction;

  return callApi(apiMethod, authenticated).then(
    (response) =>
      next({
        type: successType,
        payload: response,
      }),
    (error) => next({
      type: errorType,
      error,
    })
  )
}
