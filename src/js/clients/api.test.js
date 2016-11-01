import { afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { auth, unauth } from './api';
import fetchMock from 'fetch-mock';

describe('auth api calls', function() {
  const session = /.*\/session/;

  afterEach(() => {
    fetchMock.restore();
  })

  describe('auth api call', () => {

    it('makes a request to login', (done) => {

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

      fetchMock.post(session, {
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

      auth(identifier, password, encryptedPassword)
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
          expect(fetchMock.lastOptions(session).body).to.equal(
            JSON.stringify({
              identifier,
              password,
              encryptedPassword,
            })
          );

          done();
        });
    });

    it('makes a request to logout', (done) => {
      fetchMock.delete(session, {
        status: 200,
        body: {},
      });

      unauth('cst', 'xst')
        .then(() => {
          const { headers } = fetchMock.lastOptions(session);
          expect(headers.CST).to.equal('cst');
          expect(headers['X-SECURITY-TOKEN']).to.equal('xst');
          done();
        });
    });
  });
});
