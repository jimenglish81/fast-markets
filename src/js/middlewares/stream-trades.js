import {
  AUTH_SUCCESS
} from '../actions/types';
import  {
  confirmRecieved,
  positionRecieved,
  accountUpdate
} from '../actions';

export default (
  tradeSubscription,
  positionSubscription,
  balanceSubscription
) => (store) => (next) => (action) => {
  if (action.type === AUTH_SUCCESS) {
    const { accountId } = action.payload;
    tradeSubscription.subscribe(accountId, (confirm) => {
      store.dispatch(confirmRecieved(confirm));
    });

    positionSubscription.subscribe(accountId, (opu) => {
      store.dispatch(positionRecieved(opu));
    });

    balanceSubscription.subscribe(accountId, (updates) => {
      store.dispatch(accountUpdate(updates));
    });
  }
  next(action);
}
