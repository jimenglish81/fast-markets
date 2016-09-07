import { auth } from './api';

describe('auth api call', function() {
  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
  });

  afterEach(() => {
    server.restore();
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

      server.respondWith('POST', /.*\/session$/,
          [ 200, { CST: cst, ['X-SECURITY-TOKEN']: xst }, JSON.stringify(resp) ]);

      auth(identifier, password, encryptedPassword)
        .then((resp) => {
          expect(resp).to.deep.equal({
            accountId,
            cst,
            lightstreamerEndpoint,
            xst,
          });
          done();
        });

      server.respond();
    });
  });
});
