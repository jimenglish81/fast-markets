import {
  TRADE_REQUEST,
  TRADE_FAILURE,
  CONFIRM_RECEIVED,
  CLEAR_CONFIRM,
} from '../actions/types';

export default (state={}, { payload, type }) => {

  switch (type) {
    case TRADE_REQUEST:
      return {
        loading: true,
      };
    case TRADE_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    case CONFIRM_RECEIVED:
      return {
        confirm: payload,
        loading: false,
      };
    case CLEAR_CONFIRM:
      return {
        confirm: null,
        loading: false,
      };
    default:
      return state;
  }
}
