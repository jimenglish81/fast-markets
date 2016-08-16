import React, { PropTypes } from 'react';
import MarketDropdownOption from './dropdown-option';

const MarketDropdown = (props) => {
  const {
    markets,
    onClick,
    selectedMarket,
  } = this.props;

  const items = markets.map((item) => {
    return (
      <MarketDropdownOption
        selected={market === selectedMarket}
        onClick={onClick}
        value={market}
      />
    );
  });

  return (
    <div className="market-dropdown">
      {items}
    </div>
  );
};

MarketDropdown.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMarket: PropTypes.object,
};

export default MarketDropdown;
