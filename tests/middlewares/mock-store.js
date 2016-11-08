export const createMockStore = (data={}) => ({
  dispatch(action) {
    return action;
  },
  getState() {
    return data;
  },
});

export const dispatchWith = (middleware) => (store, action) => {
  let dispatched = null;
  const dispatch = middleware(store)((actionAttempt) => dispatched = actionAttempt);
  const result = dispatch(action);
  return { dispatched, result };
};
