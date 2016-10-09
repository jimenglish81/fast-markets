import _ from 'lodash';
import {
  MARKET_REQUEST,
  MARKETS_REQUEST,
  MARKETS_SUCCESS,
  MARKET_SUCCESS,
  SELECT_EPIC,
  MARKET_UPDATE
} from '../actions/types';

export default (state={}, { payload, type }) => {
  const {
    markets,
    selectedEpic,
    selectedMarket,
  } = state;

  switch (type) {
    case MARKET_REQUEST:
    case MARKETS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MARKETS_SUCCESS:
      return {
        ...state,
        markets: payload,
        selectedEpic:  _.chain(payload).head().get('epic').value(),
      };
    case SELECT_EPIC:
      return {
        ...state,
        selectedEpic: payload,
      };
    case MARKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        markets: markets.map((market) => {
          if (market.epic !== payload.epic) {
            return market;
          }

          return { ...market,  ...payload };
        }),
      };
    case MARKET_UPDATE:
      const { epic, updates } = payload;

      return {
        ...state,
        markets: markets.map((market) => {
          if (market.epic !== epic) {
            return market;
          }

          return { ...market, ...updates };
        }),
      };
    default:
      return state;
  }
}

export const findMarketByEpic = (selectedEpic, markets) => {
  return markets.find(({ epic }) => epic === selectedEpic);
}
