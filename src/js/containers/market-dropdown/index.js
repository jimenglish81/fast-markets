import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectEpic } from '../../actions';
import { findMarketByEpic } from '../../reducers/markets';
import Dropdown from '../../components/market-dropdown';

class MarketDropdown extends Component {
  render() {
    const {
      markets,
      selectedMarket,
      selectEpic
    } = this.props;

    return (
      <Dropdown
        markets={markets}
        selectedMarket={selectedMarket}
        onClick={selectEpic}
      />
    );
  }
}

MarketDropdown.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedMarket: PropTypes.object.isRequired,
  selectEpic: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    markets: {
      markets,
      selectedEpic,
    },
  } = state;

  return {
    markets,
    selectedMarket: findMarketByEpic(selectedEpic, markets),
  };
}

export default connect(mapStateToProps, { selectEpic })(MarketDropdown);
