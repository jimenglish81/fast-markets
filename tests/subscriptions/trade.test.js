import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import TradeSubscription from '../../src/js/subscriptions/trade';

const generateMockLsClient = () => ({
  subscribe: sinon.stub().returns({ id: 'foo' }),
  unsubscribe: sinon.spy(),
});

describe('TradeSubscription', () => {
  it('should subscribe to correct subscription', () => {
    const accountId = 'abc123';
    const mockLsClient = generateMockLsClient();
    const subscription = new TradeSubscription(mockLsClient);
    const unsubscribeSpy = sinon.spy(subscription, 'unsubscribe');
    subscription.subscribe(accountId);

    expect(unsubscribeSpy.calledOnce).to.be.true;
    expect(mockLsClient.subscribe.calledWithMatch(
      `TRADE:${accountId}`,
      ['CONFIRMS'],
      'DISTINCT'
    )).to.be.true;
  });

  it('should unsubscribe from underlying subscription', () => {
    const accountId = 'abc123';
    const mockLsClient = generateMockLsClient();
    const instance = new TradeSubscription(mockLsClient);
    instance.subscribe(accountId);
    const subscription = instance.subscription;
    instance.unsubscribe();

    expect(mockLsClient.unsubscribe.calledWith(subscription)).to.be.true;
  });
});
