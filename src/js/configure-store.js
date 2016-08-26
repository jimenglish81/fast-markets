import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from './middlewares/logger';
import api from './middlewares/api';
import reducers from './reducers';

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
