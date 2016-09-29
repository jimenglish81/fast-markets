import React, { PropTypes } from 'react';
import { formatCurrency, formatTime } from '../../utils';

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
      size,
      expiryTime,
      strikeLevel,
      payoutAmount,
    },
  } = props;

  return (
    <div className="positions__row" key={dealId}>
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
        {'TODO'}
      </div>
      <div className="positions__cell positions__cell__stake">
        {size}
      </div>
      <div className="positions__cell positions__cell__payout">
        {formatCurrency(payoutAmount)}
      </div>
    </div>
  )
};

export default Row;
