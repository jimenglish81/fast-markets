import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

const EXPIRIES = new Map([
  ['ONE_MINUTE', 1],
  ['TWO_MINUTES', 2],
  ['FIVE_MINUTES', 5],
  ['TWENTY_MINUTES', 20],
  ['SIXTY_MINUTES', 60]
]);
const keys = [ ...EXPIRIES.keys() ];
const values = [ ...EXPIRIES.values() ];

const getMin = (values, minExpiry) => {
  for (let i = 0, l = values.length; i < l; i++) {
    if (minExpiry <= values[i]) {
      return values[i];
    }
  }

  return _.first(values);
}

const getMax = (values, maxExpiry) => {
  for (let i = 0, l = values.length; i < l; i++) {
    if (maxExpiry >= values[i]) {
      return values[i];
    }
  }

  return _.last(values);
}

const generateOptions = (min, max) => {
  const options = [];
  EXPIRIES.forEach((value, key) => {
    options.push({
      label: value,
      value: key,
      disabled: value < min || value > max,
    });
  });

  return options;
};

/**
 * Dropdown allow user to pick Sprint Market.
 * @extends {React.Component}
 * @param {Object} props
 * @param {Object[]} props.markets
 * @param {Function} props.onClick
 * @param {Object} props.selectedMarket
 */
class Expiry extends Component {
  constructor(props) {
    super(props);
    this.onExpiryClick = this.onExpiryClick.bind(this);
  }

  /**
   * Handle click of child  option by proxying on call with Market object.
   * @private
   * @param {Object} market
   */
  onExpiryClick({ target }) {
    this.props.onChange(target.value);
  }

  /**
   * Render options.
   * @private
   */
  renderItems() {
    const {
      min,
      max,
      expiry,
    } = this.props;
    const minValue = getMin(values, min);
    const maxValue = getMax(values, max);
    const minExpiry = keys[values.indexOf(minValue)];
    const expiryValue = !expiry || EXPIRIES.get(expiry) < minValue ? minExpiry : expiry;

    return generateOptions(minValue, maxValue)
      .map(({ disabled, label, value }) => {
        const isChecked = value === expiryValue;
        const classNames = [];

        if (disabled) {
          classNames.push('disabled');
        }

        if (isChecked) {
          classNames.push('checked');
        }
        return (
          <label className={classNames.join(' ')}>
            <input
              type="radio"
              value={value}
              checked={isChecked}
              name="expiry"
              onChange={this.onExpiryClick}
              disabled={disabled}
            />
            <span>{label}</span>
          </label>
        );
      });
  }

  /**
   * Render Component.
   * @public
   */
  render() {
    return (
      <div className="expiry-field">
        <div>{this.renderItems()}</div>
      </div>
    );
  }
}

Expiry.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  expiry: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Expiry;
