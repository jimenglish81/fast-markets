import {
  AUTH_SUCCESS
} from '../actions/types';
import  {
  confirmRecieved,
  positionRecieved,
  accountUpdate
} from '../actions';
import { parseOpu } from '../clients/api';
import { findMarketByEpic } from '../reducers/markets';

export default (
  tradeSubscription,
  positionSubscription,
  balanceSubscription
) => (store) => (next) => (action) => {
  if (action.type === AUTH_SUCCESS) {
    const { accountId } = action.payload;

    tradeSubscription.subscribe(accountId, (confirm) => {
      const market = findMarketByEpic(confirm.epic, store.getState().markets.markets);
      if (market) {
        confirm.instrumentName = market.instrumentName;
        store.dispatch(confirmRecieved(confirm));
      }
    });

    positionSubscription.subscribe(accountId, (opu) => {
      const market = findMarketByEpic(opu.epic, store.getState().markets.markets);
      if (market) {
        store.dispatch(positionRecieved(parseOpu(opu, market)));
      }
    });

    balanceSubscription.subscribe(accountId, (updates) => {
      store.dispatch(accountUpdate(updates));
    });
  }
  next(action);
}
