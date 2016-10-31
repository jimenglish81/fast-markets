import { describe, it } from 'mocha';
import { expect } from 'chai';
import { API_CALL } from '../middlewares/api';
import {
  authUser,
  fetchMarket,
  fetchMarkets,
  unauthUser,
  selectEpic,
  marketUpdate,
  chartUpdate,
  accountUpdate,
  confirmRecieved,
  positionRecieved,
  stakeUpdate,
  expiryUpdate,
  clearConfirm,
} from './index';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,

  UNAUTH_REQUEST,
  UNAUTH_SUCCESS,
  UNAUTH_FAILURE,

  MARKETS_REQUEST,
  MARKETS_SUCCESS,
  MARKETS_FAILURE,

  MARKET_REQUEST,
  MARKET_SUCCESS,
  MARKET_FAILURE,

  SELECT_EPIC,

  MARKET_UPDATE,
  CHART_UPDATE,
  STAKE_UPDATE,
  EXPIRY_UPDATE,
  ACCOUNT_UPDATE,

  CONFIRM_RECEIVED,
  POSITION_RECEIVED,

  CLEAR_CONFIRM,
} from './types';

describe('actions', function() {
  it(`can create 'authUser' action`, function() {
    const action = authUser('username', 'password');
    const apiAction = action[API_CALL];

    expect(action).to.be.an('object');
    expect(apiAction.apiMethod).to.be.a('function');
    expect(apiAction.authenticated).to.be.false;
    expect(apiAction.types).to.have.lengthOf(3);
    expect(apiAction.types).to.deep.equal([AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE]);
  });

  it(`can create 'unauthUser' action`, function() {
    const action = unauthUser();
    const apiAction = action[API_CALL];

    expect(action).to.be.an('object');
    expect(apiAction.apiMethod).to.be.a('function');
    expect(apiAction.authenticated).to.be.true;
    expect(apiAction.types).to.have.lengthOf(3);
    expect(apiAction.types).to.deep.equal([UNAUTH_REQUEST, UNAUTH_SUCCESS, UNAUTH_FAILURE]);
  });

  it(`can create 'fetchMarkets' action`, function() {
    const action = fetchMarkets();
    const apiAction = action[API_CALL];

    expect(action).to.be.an('object');
    expect(apiAction.apiMethod).to.be.a('function');
    expect(apiAction.authenticated).to.be.true;
    expect(apiAction.types).to.have.lengthOf(3);
    expect(apiAction.types).to.deep.equal([MARKETS_REQUEST, MARKETS_SUCCESS, MARKETS_FAILURE]);
  });


  it(`can create 'fetchMarket' action`, function() {
    const action = fetchMarket();
    const apiAction = action[API_CALL];

    expect(action).to.be.an('object');
    expect(apiAction.apiMethod).to.be.a('function');
    expect(apiAction.authenticated).to.be.true;
    expect(apiAction.types).to.have.lengthOf(3);
    expect(apiAction.types).to.deep.equal([MARKET_REQUEST, MARKET_SUCCESS, MARKET_FAILURE]);
  });

  it(`can create 'selectEpic' action`, function() {
    const epic = 'foo';
    const action = selectEpic(epic);

    expect(action.type).to.equal(SELECT_EPIC);
    expect(action.payload).to.equal(epic);
  });

  it(`can create 'marketUpdate' action`, function() {
    const epic = 'foo.ip';
    const updates = { size: 1, price: 3 };
    const action = marketUpdate(epic, updates);

    expect(action.type).to.equal(MARKET_UPDATE);
    expect(action.payload).to.deep.equal({ epic, updates });
  });

  it(`can create 'chartUpdate' action`, function() {
    const update = { timestamp: '25/01/2001', price: 3 };
    const action = chartUpdate(update);

    expect(action.type).to.equal(CHART_UPDATE);
    expect(action.payload).to.deep.equal(update);
  });

  it(`can create 'accountUpdate' action`, function() {
    const update = { profitLoss: 200, balance: 300 };
    const action = accountUpdate(update);

    expect(action.type).to.equal(ACCOUNT_UPDATE);
    expect(action.payload).to.deep.equal(update);
  });

  it(`can create 'confirmRecieved' action`, function() {
    const confirm = { stake: 2 };
    const action = confirmRecieved(confirm);

    expect(action.type).to.equal(CONFIRM_RECEIVED);
    expect(action.payload).to.deep.equal(confirm);
  });

  it(`can create 'positionRecieved' action`, function() {
    const position = { stake: 2 };
    const action = positionRecieved(position);

    expect(action.type).to.equal(POSITION_RECEIVED);
    expect(action.payload).to.deep.equal(position);
  });

  it(`can create 'stakeUpdate' action`, function() {
    const stake = 2;
    const action = stakeUpdate(stake);

    expect(action.type).to.equal(STAKE_UPDATE);
    expect(action.payload).to.equal(stake);
  });

  it(`can create 'expiryUpdate' action`, function() {
    const expiry = 'ONE_MINUTE';
    const action = expiryUpdate(expiry);

    expect(action.type).to.equal(EXPIRY_UPDATE);
    expect(action.payload).to.equal(expiry);
  });

  it(`can create 'clearConfirm' action`, function() {
    const action = clearConfirm();

    expect(action.type).to.equal(CLEAR_CONFIRM);
  });
});
