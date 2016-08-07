import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const configureStore = () => {
  const createStoreWithMiddleware =  applyMiddleware(reduxThunk)(createStore);

  return createStoreWithMiddleware(reducers);
}

export default configureStore;
