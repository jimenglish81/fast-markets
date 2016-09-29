import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

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
 * @param {Element} node React element to render.
 * @param {Object} [empty=null] Empty content to render.
 * @returns {Element|String}
 */
export const conditionalRender = (cond, node, empty=null) => {
  return cond ? node : empty;
};

/**
 * Generate unique deal reference.
 * @param {String} accountId IG account id.
 * @param {number} timestamp Current DataTime
 * @returns {String}
 */
export const generateDealReference = (accountId, timestamp=new Date().getTime()) => {
  return `MM-${timestamp}-${accountId}`;
};

export const formatCurrency = (value) => {
  return numeral(value).format('0,0.00');
};

export const formatTime = (timestamp) => {
  return moment(timestamp).format('hh:mm:ss');
}
