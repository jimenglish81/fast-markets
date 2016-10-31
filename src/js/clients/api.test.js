import { beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { auth, unauth } from './api';

describe('auth api calls', function() {
  let xhr;
  let requests;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    xhr.restore();
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
          expect(requests[0].requestBody).to.equal(
            JSON.stringify({
              identifier,
              password,
              encryptedPassword,
            })
          );

          done();
        });

      requests[0].respond(
        200,
        {
          CST: cst,
          ['X-SECURITY-TOKEN']: xst,
        },
        JSON.stringify(resp)
      );
    });
  });

  it('makes a request to logout', (done) => {
    unauth('cst', 'xst')
      .then(() => {
        const [ req ] = requests;
        expect(req.method).to.equal('DELETE');
        expect(req.requestHeaders.cst).to.equal('cst');
        expect(req.requestHeaders['x-security-token']).to.equal('xst');
        done();
      });

    requests[0].respond(200, null, JSON.stringify({}));
  });
});
