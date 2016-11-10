import { expect } from 'chai';
import { describe, it } from 'mocha';
import moment from 'moment';
import {
  applyPartialRight,
  objectToQueryParams,
  conditionalRender,
  generateDealReference,
  formatCurrency,
  formatTime
} from '../../src/js/utils/index';

describe('Util functions', () => {
  describe('applyPartialRight', () => {
    it('can apply arguments to the right', () => {
      const fn = (...args) => args;
      const applied = applyPartialRight(fn, ['foo', 'bar']);

      expect(applied('qux')).to.deep.equal(['qux', 'foo', 'bar']);
    });

    it('can apply arguments to the right with placeholders', () => {
      const fn = (arg1, arg2='foo', arg3='bar', arg4='baz') => [arg1, arg2, arg3, arg4];
      const applied = applyPartialRight(fn, ['qux'], 3);

      expect(applied('quux')).to.deep.equal(['quux', 'foo', 'bar', 'qux']);
    });
  });

  describe('objectToQueryParams', () => {
    it('can serialize an object with a single value to query params', () => {
      const obj = {
        foo: 'bar',
      };

      expect(objectToQueryParams(obj)).to.equal('foo=bar');
    });

    it('can serialize an object to query params', () => {
      const obj = {
        foo: 'bar',
        baz: 'qux',
      };

      expect(objectToQueryParams(obj)).to.equal('foo=bar&baz=qux');
    });

    it('can URI encode key and value of supplied object', () => {
      const obj = {
        'foo&': 'bar:',
        'baz/': 'qux?',
      };

      expect(objectToQueryParams(obj)).to.equal('foo%26=bar%3A&baz%2F=qux%3F');
    });
  });

  describe('conditionalRender', () => {
    it(`can conditionally return a 'node'`, () => {
      expect(conditionalRender(true, 'node')).to.equal('node');
    });

    it('can conditionally return an empty value', () => {
      expect(conditionalRender(false, 'node')).to.equal(null);
      expect(conditionalRender(false, 'node', 'empty')).to.equal('empty');
    });
  });

  describe('generateDealReference', () => {
    it('can generate a deal reference', () => {
      expect(generateDealReference('deal', 12345)).to.equal('MM-12345-deal');
    });
  });

  describe('formatCurrency', () => {
    [
      [1, undefined, '1.00'],
      [2, '$', '$2.00'],
      [3.456, '£', '£3.46'],
    ].forEach(([value, currency, expected]) => {
      it(`formatCurrency ${value} with ${currency ? currency : 'no currency'}.`, () => {
        expect(formatCurrency(value, currency)).to.equal(expected);
      });
    });
  });

  describe('formatTime', () => {
    it('can format time', () => {
      const timestamp = '2016-10-01T20:30:00';
      expect(formatTime(timestamp)).to.equal(moment(new Date(timestamp)).format('HH:mm:ss'));
    });
  });
});
