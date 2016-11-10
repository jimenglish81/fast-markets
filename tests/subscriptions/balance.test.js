import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import BalanceSubscription from '../../src/js/subscriptions/balance';

const generateMockLsClient = () => ({
  subscribe: sinon.stub().returns({ id: 'foo' }),
  unsubscribe: sinon.spy(),
});

describe('BalanceSubscription', () => {
  it('should set fids and schema', () => {
    const fids = ['PNL', 'AVAILABLE_CASH'];
    const schema = ['profitLoss', 'availableCash'];
    const subscription = new BalanceSubscription(
      generateMockLsClient(),
      fids,
      schema,
    );

    expect(subscription.fids).to.deep.equal(fids);
    expect(subscription.schema).to.deep.equal(schema);
  });

  it('should subscribe to correct subscription', () => {
    const accountId = 'abc123';
    const mockLsClient = generateMockLsClient();
    const fids = ['PNL', 'AVAILABLE_CASH'];
    const schema = ['profitLoss', 'availableCash'];
    const subscription = new BalanceSubscription(
      mockLsClient,
      fids,
      schema,
    );
    subscription.subscribe(accountId);

    expect(mockLsClient.subscribe.calledWithMatch(
      `ACCOUNT:${accountId}`,
      ['PNL', 'AVAILABLE_CASH'],
      'MERGE'
    )).to.be.true;
  });

  it('should unsubscribe from underlying subscription', () => {
    const accountId = 'abc123';
    const mockLsClient = generateMockLsClient();
    const fids = ['PNL', 'AVAILABLE_CASH'];
    const schema = ['profitLoss', 'availableCash'];
    const instance = new BalanceSubscription(mockLsClient);
    instance.subscribe(accountId);
    const subscription = instance.subscription;
    instance.unsubscribe();

    expect(mockLsClient.unsubscribe.calledWith(subscription)).to.be.true;
  });
});
