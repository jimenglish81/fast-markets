import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith } from './mock-store';
import {
  AUTH_SUCCESS,
  UNAUTH_SUCCESS,
  UNAUTH_FAILURE
} from '../../src/js/actions/types';
import connectLs from '../../src/js/middlewares/connect-ls';

describe('ConnectLs middleware', () => {
  const generateMockLs = () => ({
    connect: sinon.spy(),
    disconnect: sinon.spy(),
  });

  it('does not call ls client for unassociated action', () => {
    const action = {
      type: 'UNRELATED_ACTION',
    };
    const lsClient = generateMockLs();

    dispatchWith(connectLs(lsClient))({}, action);

    expect(lsClient.connect.notCalled).to.be.true;
    expect(lsClient.disconnect.notCalled).to.be.true;
  });

  it('calls ls client disconnect for AUTH_SUCCESS action', () => {
    const accountId = 'abc123';
    const cst = 'CST';
    const lightstreamerEndpoint = '//endpoint';
    const xst = 'XST';
    const action = {
      type: AUTH_SUCCESS,
      payload: {
        accountId,
        cst,
        lightstreamerEndpoint,
        xst,
      },
    };
    const lsClient = generateMockLs();

    dispatchWith(connectLs(lsClient))({}, action);

    expect(
      lsClient.connect.calledWith(
        lightstreamerEndpoint,
        accountId,
        cst,
        xst
      )
    ).to.be.true;
    expect(lsClient.disconnect.notCalled).to.be.true;
  });

  [UNAUTH_SUCCESS, UNAUTH_FAILURE].forEach((type) => {
    it(`calls ls client disconnect for ${type} action`, () => {
      const action = {
        type,
      };
      const lsClient = generateMockLs();

      dispatchWith(connectLs(lsClient))({}, action);

      expect(lsClient.connect.notCalled).to.be.true;
      expect(lsClient.disconnect.calledOnce).to.be.true;
    });
  });
});
