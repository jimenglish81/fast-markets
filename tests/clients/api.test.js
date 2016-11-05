import { afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import {
  auth,
  unauth,
  sprints,
  market,
  chart,
  positions,
  parseOpu,
  createTrade
} from '../../src/js/clients/api';
import fetchMock from 'fetch-mock';

describe('api client', () => {
  const sessionMatch = /.*\/session/;
  const fastMarketsMatch = /.*\/marketnavigation/;
  const marketMatch = /.*\/markets\//;
  const chartMatch = /.*\/prices\/.*\/SECOND/;
  const positionsMatch = /.*\/positions\/sprintmarkets/;

  afterEach(() => {
    fetchMock.restore();
  });

  describe('auth api', () => {
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

  describe('market api', () => {
    it('makes request to get fastmarkets', () => {
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
      fetchMock.get(fastMarketsMatch, {
        status: 200,
    	  body: {
          markets,
        },
      });

      return sprints('cst', 'xst')
        .then((resp) => {
          const { headers } = fetchMock.lastOptions(fastMarketsMatch);
          expect(headers.CST).to.equal('cst');
          expect(headers['X-SECURITY-TOKEN']).to.equal('xst');

          expect(resp).to.deep.equal(markets);
        });
    });

    it('makes request to get individual market', () => {
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

    it('makes request to get chart data', () => {
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

  describe('trade api', () => {
    it('makes request to get positions', () => {
      const generatePosition = (direction) => ({
        instrumentName: 'foo',
        size: 1,
        payoutAmount: 10,
        expiryTime: 20160109,
        createdDate: 20160109,
        dealId: 1,
        epic: 'foo.ip',
        size: 1,
        strikeLevel: 100,
        direction,
      });

      const sprintMarketPositions = [
        generatePosition('BUY'),
        generatePosition('SELL'),
      ];
      fetchMock.get(positionsMatch, {
        status: 200,
        body: {
          sprintMarketPositions,
        },
      });

      return positions('cst', 'xst')
        .then((resp) => {
          const { headers } = fetchMock.lastOptions(positionsMatch);
          expect(headers.CST).to.equal('cst');
          expect(headers['X-SECURITY-TOKEN']).to.equal('xst');

          const [ first, last ] = sprintMarketPositions;
          expect(resp).to.deep.equal([
            {
              instrumentName: first.instrumentName,
              payoutAmount: parseFloat(first.payoutAmount),
              expiryTime: first.expiryTime,
              createdDate: first.createdDate,
              dealId: first.dealId,
              epic: first.epic,
              stake: parseFloat(first.size),
              strikeLevel: parseFloat(first.strikeLevel),
              direction: 'ABOVE',
              isSettled: false,
            },
            {
              instrumentName: last.instrumentName,
              payoutAmount: parseFloat(last.payoutAmount),
              expiryTime: last.expiryTime,
              createdDate: last.createdDate,
              dealId: last.dealId,
              epic: last.epic,
              stake: parseFloat(last.size),
              strikeLevel: parseFloat(last.strikeLevel),
              direction: 'BELOW',
              isSettled: false,
            }
          ]);
        });
    });

    it('parses an OPU', () => {
      const market = { instrumentName: 'foo' };
      const opu = {
        payoutAmount: 10,
        expiryTime: 20160918,
        createdDate: 20160918,
        dealId: 10,
        epic: 'foo.ip',
        status: 'CREATED',
        size: 10,
        level: 100,
      };

      ['BUY', 'SELL'].forEach((direction) => {
        expect(parseOpu({ ...opu, direction }, market)).to.deep.equal({
          instrumentName: market.instrumentName,
          payoutAmount: parseFloat(opu.payoutAmount),
          expiryTime: opu.expiryTime,
          createdDate: opu.createdDate,
          dealId: opu.dealId,
          epic: opu.epic,
          status: opu.status,
          stake: parseFloat(opu.size),
          strikeLevel: parseFloat(opu.level),
          direction: direction === 'BUY' ? 'ABOVE' : 'BELOW',
          isSettled: false,
        });
      });
    });

    it('makes request to create a position', () => {
      const payload = {
        size: 100,
        level: 2,
      };
      fetchMock.post(positionsMatch, {
        status: 200,
        body: {},
      });

      return createTrade(payload, 'cst', 'xst')
        .then((resp) => {
          const { headers } = fetchMock.lastOptions(positionsMatch);
          expect(headers.CST).to.equal('cst');
          expect(headers['X-SECURITY-TOKEN']).to.equal('xst');

          expect(fetchMock.lastOptions(positionsMatch).body).to.equal(
            JSON.stringify(payload)
          );
        });
    });
  });
});
