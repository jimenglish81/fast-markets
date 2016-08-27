import _ from 'lodash';
import {
  MARKETS_SUCCESS,
  MARKET_SUCCESS,
  SELECT_EPIC,
} from '../actions/types';

export default (state={}, { payload, type }) => {
  switch (type) {
    case MARKETS_SUCCESS:
      return {
        ...state,
        markets: payload,
        selectedEpic: _.chain(payload).head().get('epic').value(),
      };
    case SELECT_EPIC:
      return {
        ...state,
        selectedEpic: payload,
      };
    case MARKET_SUCCESS:
      return {
        ...state,
        selectedMarket: payload,
      };
    default:
      return state;
  }
}
