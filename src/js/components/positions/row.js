import React, { PropTypes } from 'react';
import { formatCurrency, formatTime } from '../../utils';
import Sparkline from '../chart/sparkline';

/**
 * Positions for app.
 * @param {Object} props
 * @return {Element}
 */
const Row = (props) => {
  const {
    position: {
      instrumentName,
      dealId,
      direction,
      stake,
      expiryTime,
      strikeLevel,
      payoutAmount,
    },
    market: {
      strike,
    }
  } = props;

  return (
    <div className="positions__row">
      <div className="positions__cell positions__cell__market-name">
        {instrumentName}
      </div>
      <div className="positions__cell positions__cell__direction">
        {direction === 'BUY' ? 'Above' : 'Below'}
      </div>
      <div className="positions__cell positions__cell__expiry">
        {formatTime(expiryTime)}
      </div>
      <div className="positions__cell positions__cell__strike">
        {formatCurrency(strikeLevel)}
      </div>
      <div className="positions__cell positions__cell__latest">
        {formatCurrency(strike)}
      </div>
      <div className="positions__cell positions__cell__stake">
        {formatCurrency(stake)}
      </div>
      <div className="positions__cell positions__cell__payout">
        {formatCurrency(payoutAmount)}
      </div>
      <div>
        <Sparkline />
      </div>
    </div>
  )
};

Row.propTypes = {
  position: PropTypes.object.isRequired,
  market: PropTypes.object.isRequired,
};

export default Row;
