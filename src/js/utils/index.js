import _ from 'lodash';

/**
 * Partially apply Function from right hand side with given number of optional
 * placeholders.
 * @private
 * @param {Function} fn
 * @param {Object} args
 * @param {Number} placeholders
 * @returns {Function}
 */
export function applyPartialRight(fn, args, placeholders=0) {
  return _.partialRight(fn, ...Array(placeholders).fill(_), ...[].concat(args));
}

/**
 * Transform Object into URI encoded query string.
 * @private
 * @param {Object} target Object to transform.
 * @returns {string}
 */
export function objectToQueryParams(target) {
  const encode = encodeURIComponent;
  return _.map(
            target,
            (value, key) => `${encode(key)}=${encode(value)}`)
            .join('&');
}
