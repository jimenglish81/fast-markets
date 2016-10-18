import {
  CONFIRM_RECEIVED,
  TRADE_FAILURE,
} from '../actions/types';
import { clearConfirm } from '../actions';

// TODO - lodash debounce
export default ({ dispatch }) => {
  let timeout;
  return (next) => (action) => {
    if (action.type === CONFIRM_RECEIVED || action.type === TRADE_FAILURE) {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        dispatch(clearConfirm());
      }, 2500);
    }

    next(action);
  };
}
