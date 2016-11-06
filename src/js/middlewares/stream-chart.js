import { CHART_SUCCESS } from '../actions/types';
import { chartUpdate } from '../actions/index';

export default (chartSubscription) => (store) => {
  return (next) => (action) => {
    if (action.type === CHART_SUCCESS) {
      const epic = action.payload.epic;
      chartSubscription.unsubscribe();
      chartSubscription.subscribe(epic, (updates) => {
        store.dispatch(chartUpdate(updates));
      });
    }

    next(action);
  };
}
