import {
  SIZE_UPDATE,
  EXPIRY_UPDATE
} from '../actions/types';

export default (state={}, { payload, type }) => {

  switch (type) {
    case SIZE_UPDATE:
      return {
        ...state,
        size: payload,
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
