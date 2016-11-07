export const createMockStore = (data) => ({
  getState() {
    return data;
  },
});

export const dispatchWith = (middleware) => (data, action) => {
  let dispatched = null;
  const dispatch = middleware(createMockStore(data))((actionAttempt) => dispatched = actionAttempt);
  const result = dispatch(action);
  return { dispatched, result };
};
