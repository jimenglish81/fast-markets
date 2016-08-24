import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import logger from './middlewares/logger';
import api from './middlewares/api'
const configureStore = () => {
  const middlewares = [reduxThunk, api];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  const store = createStoreWithMiddleware(reducers);

  return store;
}

export default configureStore;
