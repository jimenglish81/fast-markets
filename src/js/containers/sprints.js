import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMarkets } from '../actions';
import Chart from '../components/chart';
import MarketDropdown from '../containers/market-dropdown';
import Ticket from './ticket';
import { conditionalRender } from '../utils';

// TODO does MarketDropdown need to be a container
class Sprints extends Component {
  componentWillMount() {
    this.props.fetchMarkets();
  }

  // componentWillUpdate(nextProps) {
  // TODO - can use to switch markets?
  //   if (checkFn(nextProps.isAuthenticated)) {
  //     this.props.router.push(route);
  //   }
  // }

  render() {
    const { selectedMarket } = this.props;

    return conditionalRender(selectedMarket, (
      <div>
        <MarketDropdown />
        <Ticket />
        <Chart />
      </div>
    ));
  }
}

Sprints.propTypes = {
  selectedMarket: PropTypes.object,
  fetchMarkets: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    markets: {
      markets,
      selectedMarket,
    },
  } = state;

  return {
    //markets,
    selectedMarket,
  };
}

export default connect(mapStateToProps, { fetchMarkets })(Sprints);
