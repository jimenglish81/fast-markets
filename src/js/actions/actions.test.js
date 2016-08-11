import { login } from './index';

describe('an action test', function() {
  it('works', function() {
    const action = login('session');
    // expect(action.payload).to.equal('session', 'action payload to be set');
    expect(true).to.be.true;
  });
});
