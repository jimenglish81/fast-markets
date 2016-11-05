import { describe, it } from 'mocha';
import { expect } from 'chai';
import {
  STAKE_UPDATE,
  EXPIRY_UPDATE
} from '../../src/js/actions/types';
import reducer, { calculatePayout } from '../../src/js/reducers/ticket';

describe('Ticket reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({});
  });

  it('should handle the STAKE_UPDATE action', () => {
    const action = {
      type: STAKE_UPDATE,
      payload: 3,
    };

    expect(reducer(undefined, action)).to.deep.equal({ stake: 3 });
    expect(reducer({ stake: 1, expiry: 'now' }, action)).to.deep.equal({ stake: 3, expiry: 'now' });
  });

  it('should handle the EXPIRY_UPDATE action', () => {
    const action = {
      type: EXPIRY_UPDATE,
      payload: 'soon',
    };

    expect(reducer(undefined, action)).to.deep.equal({ expiry: 'soon' });
    expect(reducer({ stake: 1 }, action)).to.deep.equal({ expiry: 'soon', stake: 1 });
  });
});
