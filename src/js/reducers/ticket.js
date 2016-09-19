import {
  SIZE_UPDATE
} from '../actions/types';

export default (state={}, { payload, type }) => {

  switch (type) {
    case SIZE_UPDATE:
      return {
        ...state,
        size: payload,
      };
    default:
      return state;
  }
}
