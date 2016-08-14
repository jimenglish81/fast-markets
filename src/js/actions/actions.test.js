import {
  authUser,
  unauthUser,
  authError
} from './index';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

describe('an action test', function() {
  it(`can create 'authUser' action`, function() {
    const payload = 'session';
    const action = authUser(payload);
    expect(action.type).to.equal(AUTH_USER);
    expect(action.payload).to.equal(payload);
  });

  it(`can create 'unauthUser' action`, function() {
    const action = unauthUser();
    expect(action.type).to.equal(UNAUTH_USER);
  });

  it(`can create 'authError' action`, function() {
    const payload = 'error';
    const action = authError(payload);
    expect(action.type).to.equal(AUTH_ERROR);
    expect(action.payload).to.equal(payload);
  });
});
