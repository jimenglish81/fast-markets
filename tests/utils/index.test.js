import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  applyPartialRight,
  objectToQueryParams,
  conditionalRender,
  generateDealReference
} from '../../src/js/utils/index';

describe('util functions', function() {

  describe('applyPartialRight', function() {

    it('can apply arguments to the right', function() {
      const fn = (...args) => args;
      const applied = applyPartialRight(fn, ['foo', 'bar']);

      expect(applied('qux')).to.deep.equal(['qux', 'foo', 'bar']);
    });

    it('can apply arguments to the right with placeholders', function() {
      const fn = (arg1, arg2='foo', arg3='bar', arg4='baz') => [arg1, arg2, arg3, arg4];
      const applied = applyPartialRight(fn, ['qux'], 3);

      expect(applied('quux')).to.deep.equal(['quux', 'foo', 'bar', 'qux']);
    });
  });

  describe('objectToQueryParams', function() {

    it('can serialize an object with a single value to query params', function() {
      const obj = {
        foo: 'bar',
      };

      expect(objectToQueryParams(obj)).to.equal('foo=bar');
    });

    it('can serialize an object to query params', function() {
      const obj = {
        foo: 'bar',
        baz: 'qux',
      };

      expect(objectToQueryParams(obj)).to.equal('foo=bar&baz=qux');
    });

    it('can URI encode key and value of supplied object', function() {
      const obj = {
        'foo&': 'bar:',
        'baz/': 'qux?',
      };

      expect(objectToQueryParams(obj)).to.equal('foo%26=bar%3A&baz%2F=qux%3F');
    });
  });


  describe('conditionalRender', function() {

    it(`can conditionally return a 'node'`, function() {
      expect(conditionalRender(true, 'node')).to.equal('node');
    });

    it('can conditionally return an empty value', function() {
      expect(conditionalRender(false, 'node')).to.equal(null);
      expect(conditionalRender(false, 'node', 'empty')).to.equal('empty');
    });
  });

  describe('generateDealReference', function() {

    it('can generate a deal reference', function() {
      expect(generateDealReference('deal', 12345)).to.equal('MM-12345-deal');
    });
  });
});
