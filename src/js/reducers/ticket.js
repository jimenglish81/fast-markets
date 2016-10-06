import {
  STAKE_UPDATE,
  EXPIRY_UPDATE
} from '../actions/types';

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
