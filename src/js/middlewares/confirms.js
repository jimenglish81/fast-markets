import { CONFIRM_RECEIVED } from '../actions/types';
import { clearConfirm } from '../actions';

export default ({ dispatch }) => {
  let timeout;
  return (next) => (action) => {
    if (action.type === CONFIRM_RECEIVED) {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        dispatch(clearConfirm());
      }, 2000);
    }

    next(action);
  };
}
