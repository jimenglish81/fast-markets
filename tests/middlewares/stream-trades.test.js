import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith } from './mock-store';
import {
  AUTH_SUCCESS
} from '../../src/js/actions/types';
import streamTrades from '../../src/js/middlewares/stream-trades';

const generateMockSubscription = () => ({
  subscribe: sinon.spy(),
  unsubscribe: sinon.spy(),
});
describe('Stream trades middleware', () => {
  it('ignores unassociated actions', () => {
    const action = {
      type: 'UNRELATED_ACTION',
    };
    const tradeSubscription = generateMockSubscription();
    const positionSubscription = generateMockSubscription();
    const balanceSubscription = generateMockSubscription();
    dispatchWith(
      streamTrades(tradeSubscription, positionSubscription, balanceSubscription)
    )({}, action);

    expect(tradeSubscription.subscribe.notCalled).to.be.true;
    expect(positionSubscription.subscribe.notCalled).to.be.true;
    expect(balanceSubscription.subscribe.notCalled).to.be.true;
  });

  it('subscribes to markets subscription when MARKETS_SUCCESS is triggered', () => {
    const accountId = 'abc123';
    const action = {
      type: AUTH_SUCCESS,
      payload: {
        accountId,
      },
    };
    const tradeSubscription = generateMockSubscription();
    const positionSubscription = generateMockSubscription();
    const balanceSubscription = generateMockSubscription();
    dispatchWith(
      streamTrades(tradeSubscription, positionSubscription, balanceSubscription)
    )({}, action);

    expect(tradeSubscription.subscribe.calledWith(accountId)).to.be.true;
    expect(positionSubscription.subscribe.calledWith(accountId)).to.be.true;
    expect(balanceSubscription.subscribe.calledWith(accountId)).to.be.true;
  });
});
