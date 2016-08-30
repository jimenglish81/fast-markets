import _ from 'lodash';

/**
 * Partially apply Function from right hand side with given number of optional
 * placeholders.
 * @param {Function} fn
 * @param {Object} args
 * @param {Number} placeholders
 * @returns {Function}
 */
export const applyPartialRight = (fn, args, placeholders=0) => {
  return _.partialRight(fn, ..._.fill(Array(placeholders), _), ...[].concat(args));
}

/**
 * Transform Object into URI encoded query string.
 * @param {Object} target Object to transform.
 * @returns {String}
 */
export const objectToQueryParams = (target) => {
  const encode = encodeURIComponent;
  return _.map(
            target,
            (value, key) => `${encode(key)}=${encode(value)}`)
            .join('&');
}

/**
 * Conditionally render a React component.
 * @param {Boolean} cond Condition to evaluate.
 * @param {Element} element React element to render.
 * @param {Object} [empty=null] Empty content to render.
 * @returns {Element|String}
 */
export const conditionalRender = (cond, node, empty=null) => {
  return cond ? node : empty;
};

export const generateDealReference = (accountId, timestamp) => {
  return '1234567890';
};
