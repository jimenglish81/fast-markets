import {
  MARKETS_REQUEST,
  MARKETS_SUCCESS,
  MARKETS_FAILURE,
  SELECT_MARKET
} from '../actions/types';

export default (state={}, { payload, type }) => {
  switch (type) {
    case MARKETS_SUCCESS:
      return {
        markets: payload,
        selectedMarket: payload[0],
      };
    case SELECT_MARKET:
      return {
        ...state,
        selectedMarket: payload,
      };
    default:
      return state;
  }
}
