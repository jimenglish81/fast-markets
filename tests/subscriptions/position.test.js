import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import PositionSubscription from '../../src/js/subscriptions/position';

const generateMockLsClient = () => ({
  subscribe: sinon.stub().returns({ id: 'foo' }),
  unsubscribe: sinon.spy(),
});

describe('PositionSubscription', () => {
  it('should subscribe to correct subscription', () => {
    const accountId = 'abc123';
    const mockLsClient = generateMockLsClient();
    const subscription = new PositionSubscription(mockLsClient);
    const unsubscribeSpy = sinon.spy(subscription, 'unsubscribe');
    subscription.subscribe(accountId);

    expect(unsubscribeSpy.calledOnce).to.be.true;
    expect(mockLsClient.subscribe.calledWithMatch(
      `TRADE:${accountId}`,
      ['OPU'],
      'DISTINCT'
    )).to.be.true;
  });

  it('should unsubscribe from underlying subscription', () => {
    const accountId = 'abc123';
    const mockLsClient = generateMockLsClient();
    const instance = new PositionSubscription(mockLsClient);
    instance.subscribe(accountId);
    const subscription = instance.subscription;
    instance.unsubscribe();

    expect(mockLsClient.unsubscribe.calledWith(subscription)).to.be.true;
  });
});
