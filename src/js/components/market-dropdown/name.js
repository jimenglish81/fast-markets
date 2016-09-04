import React, { PropTypes } from 'react';

export const MARKET_STATUS_TRADEABLE_TITLE = 'Market Open';
export const MARKET_STATUS_UNTRADEABLE_TITLE = 'Market Closed';

/**
 * @desc render market name and makret status.
 * @access public
 * @param {Object} props
 * @param {String} props.name
 * @param {String} props.status
 * @return {Element}
 */
const MarketName = (props) => {
  const isTradeable = props.status === 'TRADEABLE';
  const status = isTradeable ?
                  'tradeable' : 'untradeable';
  const className = 'market-name__status';
  const statusClassName = `${className} market-name__status--${status}`;
  const statusTitle = isTradeable ?
                  MARKET_STATUS_TRADEABLE_TITLE : MARKET_STATUS_UNTRADEABLE_TITLE;

  return (
    <div className="market-name">
      <span
        className={statusClassName}
        data-market-name-status
        title={statusTitle}>
      </span>
      <strong
        className="market-name__title"
        data-market-name-title
        title={props.name}>
        {props.name}
      </strong>
    </div>
  );
};

MarketName.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default MarketName;
