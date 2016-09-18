import {
  CONFIRM_RECIEVED
} from '../actions/types';

export default (state={}, { payload, type }) => {

  switch (type) {
    case TRADE_REQUEST:
      return {
        loading: true,
      };
    case TRADE_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    case CONFIRM_RECIEVED:
      return {
        ...payload,
        loading: false,
      };
    default:
      return state;
  }
}
