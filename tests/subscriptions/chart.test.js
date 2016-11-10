import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import ChartSubscription from '../../src/js/subscriptions/chart';

const generateMockLsClient = () => ({
  subscribe: sinon.stub().returns({ id: 'foo' }),
  unsubscribe: sinon.spy(),
});

describe('ChartSubscription', () => {
  it('should subscribe to correct subscription', () => {
    const epic = 'foo.ip';
    const mockLsClient = generateMockLsClient();
    const subscription = new ChartSubscription(mockLsClient);
    subscription.subscribe(epic);

    expect(mockLsClient.subscribe.calledWithMatch(
      `CHART:${epic}:TICK`,
      ['BID', 'UTM'],
      'DISTINCT'
    )).to.be.true;
  });

  it('should unsubscribe from underlying subscription', () => {
    const epic = 'foo.ip';
    const mockLsClient = generateMockLsClient();
    const instance = new ChartSubscription(mockLsClient);
    instance.subscribe(epic);
    const subscription = instance.subscription;
    instance.unsubscribe();

    expect(mockLsClient.unsubscribe.calledWith(subscription)).to.be.true;
  });
});
