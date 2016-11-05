import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { MockLightstreamer, MockSubscription } from './mock-lightstreamer';
import LsClient from '../../src/js/clients/ls-client';

describe('LS Client', () => {
  const endpoint = 'http://endpoint';
  const accountId = 'abc';
  const cst = 'cst';
  const xst = 'xst';

  beforeEach(() => {
    global.Lightstreamer = {
      LightstreamerClient: MockLightstreamer,
      Subscription: MockSubscription,
    };
  });

  it('connects to underlying client', () => {
    const lsClient = new LsClient();
    lsClient.connect(endpoint, accountId, cst, xst);
    const { client  } = lsClient;

    expect(client.endpoint).to.equal(endpoint);
    expect(client.connectionDetails.user).to.equal(accountId);
    expect(client.connectionDetails.password).to.equal(`CST-${cst}|XST-${xst}`);
    expect(client.status).to.equal('CONNECTED');
  });

  it('subscribes correctly with snapshot', () => {
    const lsClient = new LsClient();
    lsClient.connect(endpoint, accountId, cst, xst);
    const { client  } = lsClient;
    const subscription = lsClient.subscribe('foo-str', ['foo'], 'MERGE', 'onItemUpdate', true, 2);

    expect(subscription.mode).to.equal('MERGE');
    expect(subscription.subscriptionStr).to.equal('foo-str');
    expect(subscription.fids).to.deep.equal(['foo']);
    expect(subscription.requestedSnapshot).to.equal('yes');
    expect(subscription.maxFrequency).to.equal(2);
  });

  it('subscribes correctly without snapshot', () => {
    const lsClient = new LsClient();
    lsClient.connect(endpoint, accountId, cst, xst);
    const { client  } = lsClient;
    const subscription = lsClient.subscribe('foo-str', ['foo'], 'MERGE', 'onItemUpdate', false);

    expect(subscription.requestedSnapshot).to.equal('no');
  });

  it('unsubscribes correctly', () => {
    const lsClient = new LsClient();
    const mockSubscription = { subcriptionStr: 'foo' };
    lsClient.connect(endpoint, accountId, cst, xst);
    const { client  } = lsClient;
    const unsubscribeSpy = sinon.spy(client, 'unsubscribe');
    lsClient.unsubscribe(mockSubscription);

    expect(unsubscribeSpy.calledWith(mockSubscription)).to.be.true;
  });

  it('disconnects from underlying client', () => {
    const lsClient = new LsClient();
    lsClient.connect(endpoint, accountId, cst, xst);
    const { client  } = lsClient;
    const disconnectSpy = sinon.spy(client, 'disconnect');
    lsClient.disconnect();

    expect(client.status).to.equal('DISCONNECTED');
    expect(disconnectSpy.calledOnce).to.be.true;
  });
});
