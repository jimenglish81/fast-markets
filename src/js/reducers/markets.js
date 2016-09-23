import _ from 'lodash';
import {
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
      const existing = _.find(markets, { epic: selectedEpic });
      return {
        ...state,
        selectedMarket: { ...existing, ...payload },
      };
    case MARKET_UPDATE:
      const { epic, updates } = payload;
      const updatedState = {};

      updatedState.markets = markets.map((market) => {
        if (market.epic !== epic) {
          return market;
        }

        return { ...market, ...updates };
      });

      if (selectedEpic === epic) {
        updatedState.selectedMarket = { ...selectedMarket, ...updates };
      }

      return {
        ...state,
        ...updatedState,
      };
    default:
      return state;
  }
}
