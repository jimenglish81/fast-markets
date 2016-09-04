import { API_CALL } from '../middlewares/api';
import {
  authUser,
  fetchMarket,
  fetchMarkets,
  unauthUser,
  selectEpic,
  marketUpdate,
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
} from './types';

describe('auth actions', function() {
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
    const epic = 'foo';
    const updates = { size: 1, price: 3 };
    const action = marketUpdate(epic, updates);

    expect(action.type).to.equal(MARKET_UPDATE);
    expect(action.payload).to.deep.equal({ epic, updates });
  });
});
