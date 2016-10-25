import {
  UNAUTH_SUCCESS,
  UNAUTH_FAILURE
} from '../actions/types';

export default (store) => (next) => (action) => {
  if ([UNAUTH_SUCCESS, UNAUTH_FAILURE].indexOf(action.type) > -1) {
    window.location.href = window.location.href.split('#')[0]
  }

  next(action);
}
