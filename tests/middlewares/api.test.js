import { describe, it, afterEach, beforeEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith } from './mock-store';
import api, { API_CALL } from '../../src/js/middlewares/api';

const errorType = 'ERROR';
const requestType = 'REQUEST';
const successType = 'SUCCESS';
const generateMockSession = (session={}) => ({
  read: sinon.stub().returns(session),
  write: sinon.spy(),
});

describe('API middleware', () => {
  it('ignores unassociated actions', () => {
    const mockSession = generateMockSession();
    const action = {
      type: 'UNRELATED_ACTION',
    };
    expect(dispatchWith(api(mockSession))({}, action).dispatched).to.equal(action);
  });

  describe('unauthenticated actions', () => {
    it('handles a successful unauthenticated API action', () => {
      const mockSession = generateMockSession();
      const session = { cst: 'CST', xst: 'XST' };
      const action = {
        type: 'API_ACTION',
        [API_CALL]: {
          apiMethod: () => Promise.resolve(session),
          types: [requestType, successType],
          authenticated: false,
        },
      };
      const { dispatched, result } = dispatchWith(api(mockSession))({}, action);
      expect(dispatched.type).to.equal(requestType);

      return result.then((resp) => {
        expect(resp).to.deep.equal({
          type: successType,
          payload: session,
        });
        expect(mockSession.write.calledWith(session)).to.be.true;
      });
    });

    it('handles an unsuccessful unauthenticated API action', () => {
      const mockSession = generateMockSession();
      const error = { error: 'invalid request' };
      const action = {
        type: 'API_ACTION',
        [API_CALL]: {
          apiMethod: () => Promise.reject(error),
          types: [requestType, successType, errorType],
          authenticated: false,
        },
      };
      const { dispatched, result } = dispatchWith(api(mockSession))({}, action);
      expect(dispatched.type).to.equal(requestType);

      return result.then((resp) => {
        expect(resp).to.deep.equal({
          type: errorType,
          error,
        });
        expect(mockSession.write.notCalled).to.be.true;
      });
    });
  });


  describe('authenticated actions', () => {
    it('handles an authenticated API action when an invalid session is supplied', () => {
      const mockSession = generateMockSession();
      const action = {
        type: 'API_ACTION',
        [API_CALL]: {
          apiMethod: function myAPIMethod() { return Promise.resolve() },
          types: [requestType, successType, errorType],
          authenticated: true,
        },
      };
      const { dispatched, result } = dispatchWith(api(mockSession))({}, action);
      expect(dispatched.type).to.equal(requestType);

      return result.then((resp) => {
        expect(resp).to.deep.equal({
          type: errorType,
          error: `Unauthenticated for 'myAPIMethod'.`,
        });
        expect(mockSession.read.calledOnce).to.be.true;
      });
    });

    it('handles an successful authenticated API action when an valid session is supplied', () => {
      const cst = 'CST';
      const xst = 'XST';
      const mockSession = generateMockSession({ cst, xst });
      const action = {
        type: 'API_ACTION',
        [API_CALL]: {
          apiMethod: (cst, xst) => Promise.resolve({ cst, xst }),
          types: [requestType, successType, errorType],
          authenticated: true,
        },
      };
      const { dispatched, result } = dispatchWith(api(mockSession))({}, action);
      expect(dispatched.type).to.equal(requestType);

      return result.then((resp) => {
        expect(resp).to.deep.equal({
          type: successType,
          payload: { cst, xst },
        });
        expect(mockSession.read.calledOnce).to.be.true;
      });
    });
  });

  it('handles an unsuccessful authenticated API action when an valid session is supplied', () => {
    const cst = 'CST';
    const xst = 'XST';
    const mockSession = generateMockSession({ cst, xst });
    const error = { error: 'invalid request' };
    const action = {
      type: 'API_ACTION',
      [API_CALL]: {
        apiMethod: () => Promise.reject(error),
        types: [requestType, successType, errorType],
        authenticated: true,
      },
    };
    const { dispatched, result } = dispatchWith(api(mockSession))({}, action);
    expect(dispatched.type).to.equal(requestType);

    return result.then((resp) => {
      expect(resp).to.deep.equal({
        type: errorType,
        error,
      });
      expect(mockSession.read.calledOnce).to.be.true;
    });
  });
});
