import { describe, it, afterEach, beforeEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { dispatchWith } from './mock-store';
import logger from '../../src/js/middlewares/logger';

describe('Logger middleware', () => {
  let { group, log, groupEnd } = console;

  beforeEach(() => {
    console.log = sinon.spy();
    console.group = sinon.spy();
    console.groupEnd = sinon.spy();
  });

  afterEach(() => {
    console.log = log;
    console.group = group;
    console.groupEnd = groupEnd;
  });

  it('logs an action', () => {
    const type = 'ACTION';
    const payload = 'payload';
    const action = {
      type,
      payload,
    };

    dispatchWith(logger)({}, action);

    expect(console.group.calledWithMatch(type)).to.be.true;
    expect(console.log.calledWithMatch(payload)).to.be.true;
    expect(console.groupEnd.calledWithMatch(type)).to.be.true;
  });

  it('ignores action if console.group is not defined', () => {
    const type = 'ACTION';
    const payload = 'payload';
    const action = {
      type,
      payload,
    };

    console.group = null;
    console.groupEnd = null;
    dispatchWith(logger)({}, action);

    expect(console.log.calledWithMatch(payload)).to.be.false;
  });
});
