import { CHART_SUCCESS } from '../actions/types';
import { chartUpdate } from '../actions/index';

export default (chartSubscription) => (store) => (next) => (action) => {
  if (action.type === CHART_SUCCESS) {
    const epic = action.payload.epic;
    chartSubscription.unsubscribe();
    chartSubscription.subscribe(epic, (updates) => {
      store.dispatch(chartUpdate(updates));
    });
  }

  next(action);
}
