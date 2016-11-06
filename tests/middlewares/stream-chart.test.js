import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith } from './mock-store';
import {
  CHART_SUCCESS
} from '../../src/js/actions/types';
import streamChart from '../../src/js/middlewares/stream-chart';

const generateMockSubscription = () => ({
  subscribe: sinon.spy(),
  unsubscribe: sinon.spy(),
});
describe('Stream chart middleware', () => {
  it('ignores unassociated actions', () => {
    const action = {
      type: 'UNRELATED_ACTION',
    };
    const subscription = generateMockSubscription();
    dispatchWith(streamChart(subscription))({}, action);

    expect(subscription.subscribe.notCalled).to.be.true;
    expect(subscription.unsubscribe.notCalled).to.be.true;
  });

  it('subscribes to chart subscription when CHART_SUCCESS is triggered', () => {
    const epic = 'foo.ip';
    const action = {
      type: CHART_SUCCESS,
      payload: {
        epic,
      },
    };
    const subscription = generateMockSubscription();
    dispatchWith(streamChart(subscription))({}, action);

    expect(subscription.subscribe.calledOnce).to.be.true;
    expect(subscription.subscribe.calledWith(epic)).to.be.true;
    expect(subscription.unsubscribe.calledOnce).to.be.true;
  });
});
