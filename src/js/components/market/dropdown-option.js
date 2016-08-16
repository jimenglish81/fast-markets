import React, { PropTypes } from 'react';
import MarketName from './name';

const MarketDropdownOption = (props) => {
  const {
    market,
    onClick,
    selected=false,
  } = props;

  return (
    <div
      className="market-dropdown-item"
      selected={selected}
      onClick={() => onClick(market)}>
      <MarketName
        status={market.status}
        marketName={market.name}
      />
    </div>
  );
};

MarketDropdownOption.propTypes = {
  market: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default MarketDropdownOption;
