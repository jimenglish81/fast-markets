import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  fetchMarkets,
  fetchMarket,
  fetchChart
} from '../actions';
import Loader from '../components/common/loader';
import Chart from './chart';
import MarketDropdown from './market-dropdown';
import Ticket from './ticket';
import Confirm from './confirm';
import Positions from './positions';
import { conditionalRender } from '../utils';

class FastMarkets extends Component {
  componentWillMount() {
    this.props.fetchMarkets();
  }

  componentWillUpdate({ selectedEpic }) {
    const {
      fetchChart,
      fetchMarket,
      selectedEpic: currentEpic,
    } = this.props;

    if (selectedEpic !== currentEpic) {
      Promise.all([
        fetchMarket(selectedEpic),
        fetchChart(selectedEpic),
      ]);
    }
  }

  render() {
    const {
      isLoading,
    } = this.props;

    return conditionalRender(!isLoading, (
      <div>
        <div className="fast-markets__wrapper">
          <div className="fast-markets__trades">
            <MarketDropdown />
            <Ticket />
            <div className="fast-markets__confirm">
              <Confirm />
            </div>
          </div>
          <div className="fast-markets__chart">
            <Chart />
          </div>
        </div>
        <div className="fast-markets__positions">
          <Positions />
        </div>
      </div>
    ), (
      <Loader />
    ));
  }
}

FastMarkets.propTypes = {
  selectedEpic: PropTypes.string,
  fetchMarkets: PropTypes.func.isRequired,
  fetchMarket: PropTypes.func.isRequired,
  fetchChart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


FastMarkets.defaultProps = {
  isLoading: true,
};

function mapStateToProps(state) {
  const {
    markets: {
      selectedEpic,
      isLoading,
    },
  } = state;

  return {
    isLoading,
    selectedEpic,
  };
}

export default connect(mapStateToProps, { fetchMarkets, fetchMarket, fetchChart })(FastMarkets);
