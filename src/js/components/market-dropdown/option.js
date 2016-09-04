import React, { PropTypes } from 'react';
import MarketName from './name';

/**
 * @desc render option that houses MarketName and triggers click.
 * @access public
 * @param {Object} props
 * @param {Object} props.market
 * @param {Function} props.status
 * @return {Element}
 */
const MarketDropdownOption = (props) => {
  const {
    market,
    onClick,
  } = props;

  return (
    <div
      className="market-dropdown__item"
      data-market-dropdown-item
      onClick={() => onClick(market.epic)}>
      <MarketName
        status={market.marketStatus}
        name={market.instrumentName}
      />
    </div>
  );
};

MarketDropdownOption.propTypes = {
  market: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MarketDropdownOption;
