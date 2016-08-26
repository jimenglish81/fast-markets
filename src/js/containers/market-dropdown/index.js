import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectMarket } from '../../actions';
import Dropdown from '../../components/market-dropdown';

class MarketDropdown extends Component {
  render() {
    const {
      markets,
      selectedMarket,
      selectMarket
    } = this.props;

    return (
      <Dropdown
        markets={markets}
        selectedMarket={selectedMarket}
        onClick={selectMarket}
      />
    );
  }
}

MarketDropdown.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedMarket: PropTypes.object.isRequired,
  selectMarket: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    markets: {
      markets,
      selectedMarket,
    },
  } = state;

  return {
    markets,
    selectedMarket,
  };
}

export default connect(mapStateToProps, { selectMarket })(MarketDropdown);
