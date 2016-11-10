import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import MarketSubscription from '../../src/js/subscriptions/market';

const generateMockLsClient = () => ({
  subscribe: sinon.stub().returns({ id: 'foo' }),
  unsubscribe: sinon.spy(),
});

describe('MarketSubscription', () => {
  it('should subscribe to correct subscription', () => {
    const epics = ['foo.ip', 'bar.ip'];
    const mockLsClient = generateMockLsClient();
    const subscription = new MarketSubscription(mockLsClient);
    subscription.subscribe(epics);

    expect(mockLsClient.subscribe.calledWithMatch(
      epics.map((epic) => `MARKET:${epic}`),
      ['MARKET_STATE', 'STRIKE_PRICE', 'ODDS'],
      'MERGE'
    )).to.be.true;
  });

  it('should unsubscribe from underlying subscription', () => {
    const epics = ['foo.ip', 'bar.ip'];
    const mockLsClient = generateMockLsClient();
    const instance = new MarketSubscription(mockLsClient);
    instance.subscribe(epics);
    const subscription = instance.subscription;
    instance.unsubscribe();

    expect(mockLsClient.unsubscribe.calledWith(subscription)).to.be.true;
  });
});
