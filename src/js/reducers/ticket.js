import {
  STAKE_UPDATE,
  EXPIRY_UPDATE
} from '../actions/types';
import { createSelector } from 'reselect';
import { findMarketByEpic } from './markets';

export default (state={}, { payload, type }) => {
  switch (type) {
    case STAKE_UPDATE:
      return {
        ...state,
        stake: payload,
      };
    case EXPIRY_UPDATE:
      return {
        ...state,
        expiry: payload,
      };
    default:
      return state;
  }
}

export const calculatePayout = createSelector(
  ({ ticket }) => ticket.stake,
  ({ markets: { selectedEpic, markets } }) => findMarketByEpic(selectedEpic, markets).odds,
  (stake, odds) => {
    const payout = parseFloat(stake) / parseFloat(odds);
    return isNaN(payout) ? null : payout;
  }
);
