import { describe, it, afterEach, beforeEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith } from './mock-store';
import {
  UNAUTH_SUCCESS,
  UNAUTH_FAILURE
} from '../../src/js/actions/types';
import logout from '../../src/js/middlewares/logout';

describe('Logout middleware', () => {
  const href = 'location#hash';
  beforeEach(() => {
    global.window = {
      location: {
        href,
      },
    };
  });

  afterEach(() => {
    global.window = null;
  });

  it('does not redirect with unassociated action', () => {
    const action = {
      type: 'UNRELATED_ACTION',
    };
    dispatchWith(logout)({}, action);
    expect(global.window.location.href).to.equal(href);
  });

  [UNAUTH_SUCCESS, UNAUTH_FAILURE].forEach((actionName) => {
    it(`redirects with ${actionName} action`, () => {
      const action = {
        type: actionName,
      };
      dispatchWith(logout)({}, action);
      expect(global.window.location.href).to.equal(href.split('#')[0]);
    });
  });
});
