import { afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { auth, unauth, sprints, market, chart } from '../../src/js/clients/api';
import fetchMock from 'fetch-mock';

describe('api calls', function() {
  const sessionMatch = /.*\/session/;
  const sprintsMatch = /.*\/marketnavigation/;
  const marketMatch = /.*\/markets\//;
  const chartMatch = /.*\/prices\/.*\/SECOND/;

  afterEach(() => {
    fetchMock.restore();
  });

  describe('auth api call', () => {
    it('makes a request to auth', () => {
      const accountId = 'abc123';
      const available = 200;
      const profitLoss = 300;
      const accountInfo = {
        available,
        profitLoss,
      };
      const cst = 'xyz123abc';
      const currencySymbol = 'GBP';
      const lightstreamerEndpoint = 'http://foo';
      const xst = '789def';

      const resp = {
        accountInfo,
        currencySymbol,
        currentAccountId: accountId,
        lightstreamerEndpoint,
      };

      fetchMock.post(sessionMatch, {
  	    status: 200,
  	    headers: {
          'CST': cst,
          'X-SECURITY-TOKEN': xst,
  	    },
  	    body: resp,
      });

      const identifier = 'username';
      const password = 'password';
      const encryptedPassword = false;

      return auth(identifier, password, encryptedPassword)
        .then((resp) => {
          expect(resp).to.deep.equal({
            accountId,
            availableCash: available,
            cst,
            currency: currencySymbol,
            lightstreamerEndpoint,
            profitLoss,
            xst,
          });
          expect(fetchMock.lastOptions(sessionMatch).body).to.equal(
            JSON.stringify({
              identifier,
              password,
              encryptedPassword,
            })
          );
        });
    });

    it('makes a request to unauth', () => {
      fetchMock.delete(sessionMatch, {
        status: 200,
        body: {},
      });

      return unauth('cst', 'xst')
        .then(() => {
          const { headers } = fetchMock.lastOptions(sessionMatch);
          expect(headers.CST).to.equal('cst');
          expect(headers['X-SECURITY-TOKEN']).to.equal('xst');
        });
    });
  });

  it('makes sprints call', () => {
    const markets = [{
      epic: 'foo.ip',
      instrumentName: 'foo',
      marketStatus: 0,
    },
    {
      epic: 'bar.ip',
      instrumentName: 'bar',
      marketStatus: 1,
    }];
    fetchMock.get(sprintsMatch, {
      status: 200,
  	  body: {
        markets,
      },
    });

    return sprints('cst', 'xst')
      .then((resp) => {
        const { headers } = fetchMock.lastOptions(sprintsMatch);
        expect(headers.CST).to.equal('cst');
        expect(headers['X-SECURITY-TOKEN']).to.equal('xst');

        expect(resp).to.deep.equal(markets);
      });
  });

  it('makes market call', () => {
    const epic = 'foo.ip';
    const marketResp = {
      instrument: {
        currencies: [
          { symbol: 'GBP' }
        ],
        epic,
        name: 'foo',
        sprintMarketsMinimumExpiryTime: 120,
        sprintMarketsMaximumExpiryTime: 600,
      },
      snapshot: {
        marketStatus: 1,
        bid: 1.0,
      },
      dealingRules: {
        minDealSize: {
          value: 1,
        },
      },
    };
    fetchMock.get(marketMatch, {
      status: 200,
      body: marketResp,
    });

    return market(epic, 'cst', 'xst')
      .then((resp) => {
        const { headers } = fetchMock.lastOptions(marketMatch);
        expect(headers.CST).to.equal('cst');
        expect(headers['X-SECURITY-TOKEN']).to.equal('xst');

        expect(resp).to.deep.equal({
          currency: marketResp.instrument.currencies[0].symbol,
          epic: marketResp.instrument.epic,
          instrumentName: marketResp.instrument.name,
          marketStatus: marketResp.snapshot.marketStatus,
          strike: marketResp.snapshot.bid,
          minDealSize: marketResp.dealingRules.minDealSize.value,
          minExpiry: marketResp.instrument.sprintMarketsMinimumExpiryTime / 60,
          maxExpiry: marketResp.instrument.sprintMarketsMaximumExpiryTime / 60,
          prices: [],
        });
      });
  });

  it('makes chart call', () => {
    const epic = 'bar.ip';
    const prices = [{
      snapshotTime: 100000,
      closePrice: {
        bid: 500
      }
    },
    {
      snapshotTime: 200000,
      closePrice: {
        bid: 200
      }
    }];
    fetchMock.get(chartMatch, {
      status: 200,
      body: {
        prices,
      },
    });

    return chart(epic, 'cst', 'xst')
      .then((resp) => {
        const { headers } = fetchMock.lastOptions(chartMatch);
        expect(headers.CST).to.equal('cst');
        expect(headers['X-SECURITY-TOKEN']).to.equal('xst');

        expect(resp).to.deep.equal({
          epic,
          dataPoints: [
            {
              timestamp: 100000,
              price: 500,
            },
            {
              timestamp: 200000,
              price: 200,
            },
          ]
        });
      });
    });

});
