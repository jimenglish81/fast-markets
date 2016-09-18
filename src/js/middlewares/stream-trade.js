import {
  AUTH_SUCCESS
} from '../actions/types';
import  {
  confirmRecieved
} from '../actions';

export default (tradeSubscription) => (store) => (next) => (action) => {
  if (action.type === AUTH_SUCCESS) {
    const { accountId } = action.payload;
    tradeSubscription.subscribe(accountId, (confirm) => {
      store.dispatch(confirmRecieved(confirm));
    });
  }
  next(action);
}
