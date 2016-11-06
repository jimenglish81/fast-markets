import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import AbstractSubscription from '../../src/js/subscriptions/abstract-subscription';

const generateMockLsClient = () => ({
  subscribe: () => null,
  unsubscribe: () => null,
});

describe('AbstractSubscription', () => {
  it('should require subscribe is implemented by subclass', () => {
    const subscription = new AbstractSubscription(generateMockLsClient());

    expect(subscription.subscribe).to.throw();
  });

  it('should unsubscribe from underlying subscription', () => {
    const lsClient = generateMockLsClient();
    const mockSubscription = { id: 'foo '};
    const instance = new AbstractSubscription(lsClient);
    instance.subscription = mockSubscription;
    const unsubscribeSpy = sinon.spy(lsClient, 'unsubscribe');

    instance.unsubscribe();

    expect(unsubscribeSpy.calledWith(mockSubscription)).to.be.true;
  });

  it('should call unsubscribe on destroy', () => {
    const subscription = new AbstractSubscription(generateMockLsClient());
    const unsubscribeSpy = sinon.spy(subscription, 'unsubscribe');
    subscription.destroy();

    expect(unsubscribeSpy.calledOnce).to.be.true;
  });
});
