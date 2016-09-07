import { auth } from './api';

describe('auth api call', function() {
  let xhr;
  let requests = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    xhr.restore();
  })

  describe('auth api call', () => {

    it('makes a request', (done) => {
      const accountId = 'abc123';
      const cst = 'xyz123abc';
      const lightstreamerEndpoint = 'http://foo';
      const xst = '789def';

      const resp = {
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
            cst,
            lightstreamerEndpoint,
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
});
