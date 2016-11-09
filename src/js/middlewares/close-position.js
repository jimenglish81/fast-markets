import {
  POSITION_RECEIVED,
} from '../actions/types';
import { removePosition } from '../actions';

export default ({ dispatch }) => {
  return (next) => (action) => {
    if (action.type === POSITION_RECEIVED) {
      if (action.payload.status === 'DELETED') {
        setTimeout(() => {
          dispatch(removePosition(action.payload.dealId));
        }, 5000);
      }
    }

    next(action);
  };
}
