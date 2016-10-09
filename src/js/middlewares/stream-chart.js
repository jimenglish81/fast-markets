import { AUTH_SUCCESS, CHART_SUCCESS } from '../actions/types';
import { chartUpdate } from '../actions/index';
import _ from 'lodash';

import moment from 'moment';

export default (chartSubscription) => (store) => {
  const throttledDispatch = _.throttle((action) => store.dispatch(action), 1000);
  return (next) => (action) => {

    if (action.type === CHART_SUCCESS) {
      const epic = action.payload.epic;
      chartSubscription.unsubscribe();
      chartSubscription.subscribe(epic, (updates) => {
        throttledDispatch(chartUpdate(updates));
      });
    }

    // if (action.type === AUTH_SUCCESS) {
    //   window.setInterval(() => {
    //     const data = store.getState().chart.dataPoints;
    //     const { timestamp, price } = _.last(data);
    //     const multiplier = (Math.random() < 0.5) ? -1 : 1;
    //
    //     store.dispatch(chartUpdate({
    //       timestamp: moment(timestamp).add(1, 'second').format('YYYY/MM/DD HH:mm:ss'),
    //       price: price + ((Math.round(100 * (Math.random() * 5)) / 100) * multiplier),
    //     }));
    //   }, 1000);
    //
    // }

    next(action);
  };
}
