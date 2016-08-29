import { MARKETS_SUCCESS } from '../actions/types';
import { marketUpdate } from '../actions/index';

export default (marketSubscription) => (store) => (next) => (action) => {
  if (action.type === MARKETS_SUCCESS) {
    const epics = action.payload.map(({ epic }) => epic);
    marketSubscription.unsubscribe();
    marketSubscription.subscribe(epics, (epic, updates) => {
      store.dispatch(marketUpdate(epic, updates));
    });
  }

  next(action);
}
