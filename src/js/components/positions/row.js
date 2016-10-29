import React, { PropTypes } from 'react';
import moment from 'moment';
import { formatCurrency, formatTime } from '../../utils';
import Sparkline from '../chart/sparkline';
import CountDown from '../common/count-down';

/**
 * Positions for app.
 * @param {Object} props
 * @return {Element}
 */
const Row = (props) => {
  const {
    position: {
      createdDate,
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
      currency,
      prices,
      strike,
    },
    isWinning,
  } = props;

  // TODO - move to component
  if (isSettled) {
    const settlementClassName = isWinning ? 'settlement--won' : 'settlement--lost';
    return (
      <div className={`settlement ${settlementClassName}`}>
        {isWinning ? `You just won ${formatCurrency(payoutAmount, currency)}!` : 'You were unsuccessful this time.'}
      </div>
    );
  }

  const expiryInSeconds = moment.utc(expiryTime)
                  .diff(moment.utc(createdDate), 'seconds');
  const timeInSeconds = moment.utc(expiryTime)
                  .diff(moment.utc(), 'seconds');

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
        <span>{formatTime(expiryTime)}</span>
        <span style={{ display: 'flex' }}>
          <CountDown
            foreground={isWinning ? '#1bc98e' : '#e64759'}
            background={'#51586a'}
            percentage={timeInSeconds / expiryInSeconds}
          />
        </span>
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
