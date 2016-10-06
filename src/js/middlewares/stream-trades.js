import {
  AUTH_SUCCESS
} from '../actions/types';
import  {
  confirmRecieved,
  positionRecieved,
  accountUpdate
} from '../actions';

// TODO - move somewhere more appropriate.
const parseOpu = (opu, market) => {
  return {
    instrumentName: market.instrumentName,
    payoutAmount: opu.payoutAmount,
    expiryTime: opu.expiryTime,
    dealId: opu.dealId,
    epic: opu.epic,
    status: opu.status,
    size: opu.size,
    strikeLevel: opu.level,
    direction: opu.direction,
  }
};

export default (
  tradeSubscription,
  positionSubscription,
  balanceSubscription
) => (store) => (next) => (action) => {
  if (action.type === AUTH_SUCCESS) {
    const { accountId } = action.payload;
    tradeSubscription.subscribe(accountId, (confirm) => {
      // TODO - move somewhere more appropriate.
      const market = store.getState().markets.markets.find((m) => m.epic === confirm.epic);
      if (market) {
        confirm.instrumentName = market.instrumentName;
        store.dispatch(confirmRecieved(confirm));
      }
    });

    positionSubscription.subscribe(accountId, (opu) => {
      // TODO - move somewhere more appropriate.
      const market = store.getState().markets.markets.find((m) => m.epic === opu.epic);
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
