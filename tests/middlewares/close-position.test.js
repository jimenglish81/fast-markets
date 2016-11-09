import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith, createMockStore } from './mock-store';
import {
  POSITION_RECEIVED,
  POSITION_REMOVED,
} from '../../src/js/actions/types';
import closePosition from '../../src/js/middlewares/close-position';

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

    dispatchWith(closePosition)(store, action);
    clock.tick(5000);

    expect(dispatchSpy.notCalled).to.be.true;
  });

  it(`triggers a remove position action when a POSITION_RECEIVED is received`, () => {
    const dealId = 'foo';
    const store = createMockStore();
    const action = {
      type: POSITION_RECEIVED,
      payload: {
        dealId,
        status: 'DELETED',
      }
    };
    const dispatchSpy = sinon.spy(store, 'dispatch');

    dispatchWith(closePosition)(store, action);
    clock.tick(5000);

    expect(dispatchSpy.calledWith({
      type: POSITION_REMOVED,
      payload: dealId,
    })).to.be.true;
  });
});
