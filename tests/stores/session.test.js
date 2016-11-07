import { describe, it } from 'mocha';
import { expect } from 'chai';
import Session from '../../src/js/stores/session';


describe('Session store', () => {
  it('returns empty object if no session present', () => {
    const session = new Session();

    expect(session.read()).to.deep.equal({});
  });

  it('reads and writes session', () => {
    const session = new Session();
    const obj = { foo: 'bar' };

    expect(session.read()).to.not.deep.equal(obj);
    session.write(obj);
    expect(session.read()).to.deep.equal(obj);
  });
});
