import {
  POSITIONS_SUCCESS,
  POSITION_RECEIVED
} from '../actions/types';

export default (state=[], { payload, type }) => {

  switch (type) {
    case POSITIONS_SUCCESS:
      return payload.slice();
    case POSITION_RECEIVED:
      if (payload.status === 'OPEN') {
        return [
          ...state,
          payload,
        ];
      }

      if (payload.status === 'DELETED') {
        return state.filter((position) => {
          return position.dealId !== payload.dealId;
        });
      }
    default:
      return state;
  }
}

export const isWinningBet = (strike, strikeLevel, direction) => {
  return (direction === 'ABOVE') ? strikeLevel < strike : strikeLevel > strike;
};
