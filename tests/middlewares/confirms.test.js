import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith, createMockStore } from './mock-store';
import {
  CLEAR_CONFIRM,
  CONFIRM_RECEIVED,
  TRADE_FAILURE,
} from '../../src/js/actions/types';
import confirms from '../../src/js/middlewares/confirms';

describe('Confirms middleware', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('ignores unassociated actions', () => {
    const store = createMockStore();
    const action = {
      type: 'UNRELATED_ACTION',
    };
    const dispatchSpy = sinon.spy(store, 'dispatch');

    dispatchWith(confirms)(store, action);
    clock.tick(2500);

    expect(dispatchSpy.notCalled).to.be.true;
  });

  [CONFIRM_RECEIVED, TRADE_FAILURE].forEach((actionType) => {
    it(`triggers a clear confirm action when a ${actionType} is received`, () => {
      const store = createMockStore();
      const action = {
        type: actionType,
      };
      const dispatchSpy = sinon.spy(store, 'dispatch');
      const clearTimeoutSpy = sinon.spy(global, 'clearTimeout');

      dispatchWith(confirms)(store, action);
      clock.tick(2500);

      expect(clearTimeoutSpy.calledOnce).to.be.true;
      expect(dispatchSpy.calledWith({ type: CLEAR_CONFIRM })).to.be.true;
    });
  });
});
