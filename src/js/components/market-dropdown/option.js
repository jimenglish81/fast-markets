import React, { PropTypes } from 'react';
import MarketName from './name';

const MarketDropdownOption = (props) => {
  const {
    market,
    onClick,
  } = props;

  return (
    <div
      className="market-dropdown-item"
      onClick={() => onClick(market)}>
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
