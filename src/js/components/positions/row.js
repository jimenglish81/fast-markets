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
      isSettled,
    },
    market: {
      prices,
      strike,
    },
    isWinning,
  } = props;

  if (isSettled) {
    return (
      <div className="positions__row">
        <div>{isWinning ? 'won' : 'lost'}</div>
      </div>
    );
  }

  return (
    <div className="positions__row">
      <div className="positions__cell positions__cell__market-name">
        <div className="positions__cell__market-name-inner">{instrumentName}</div>
        <div className="positions__cell__market-name-sparkline">
          <Sparkline
            height={17}
            isWinning={isWinning}
            prices={prices}
            strikeLevel={strikeLevel}
            width={90}
          />
        </div>
      </div>
      <div className="positions__cell positions__cell__direction">
        {direction === 'ABOVE' ? 'Above' : 'Below'}
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
    </div>
  )
};

Row.propTypes = {
  isWinning: PropTypes.bool,
  market: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
};

export default Row;
