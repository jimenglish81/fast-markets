import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith } from './mock-store';
import {
  MARKETS_SUCCESS
} from '../../src/js/actions/types';
import streamMarkets from '../../src/js/middlewares/stream-markets';

const generateMockSubscription = () => ({
  subscribe: sinon.spy(),
  unsubscribe: sinon.spy(),
});
describe('Stream markets middleware', () => {
  it('ignores unassociated actions', () => {
    const action = {
      type: 'UNRELATED_ACTION',
    };
    const subscription = generateMockSubscription();
    dispatchWith(streamMarkets(subscription))({}, action);

    expect(subscription.subscribe.notCalled).to.be.true;
    expect(subscription.unsubscribe.notCalled).to.be.true;
  });

  it('subscribes to markets subscription when MARKETS_SUCCESS is triggered', () => {
    const epicA = 'foo.ip';
    const epicB = 'bar.ip';
    const action = {
      type: MARKETS_SUCCESS,
      payload: [{
        epic: epicA,
      }, {
        epic: epicB,
      }],
    };
    const subscription = generateMockSubscription();
    dispatchWith(streamMarkets(subscription))({}, action);

    expect(subscription.subscribe.calledOnce).to.be.true;
    expect(subscription.subscribe.calledWithMatch([epicA, epicB])).to.be.true;
    expect(subscription.unsubscribe.calledOnce).to.be.true;
  });
});
