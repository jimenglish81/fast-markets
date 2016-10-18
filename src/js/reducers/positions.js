import {
  POSITIONS_SUCCESS,
  POSITION_RECEIVED,
  POSITION_REMOVED,
} from '../actions/types';

export default (state=[], { payload, type }) => {

  switch (type) {
    case POSITIONS_SUCCESS:
      return payload.slice();
    case POSITION_RECEIVED:
      // TODO - change to POSITION_ADDED
      if (payload.status === 'OPEN') {
        return [
          payload,
          ...state,
        ];
      }

      if (payload.status === 'DELETED') {
        return state.map((position) => {
          if (position.dealId === payload.dealId) {
            return { ...position, isSettled: true };
          }

          return position;
        });
      }
    case POSITION_REMOVED:
      return state.filter((position) => {
        return position.dealId !== payload;
      });
    default:
      return state;
  }
}

export const isWinningBet = (strike, strikeLevel, direction) => {
  return (direction === 'ABOVE') ? strikeLevel <= strike : strikeLevel >= strike;
};
