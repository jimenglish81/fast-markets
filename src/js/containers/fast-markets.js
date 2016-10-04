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
import { Confirm } from '../components/confirm';
import Positions from './positions';
import { conditionalRender } from '../utils';

// TODO does MarketDropdown need to be a container? Loading could be market?
class FastMarkets extends Component {
  constructor(props) {
    super(props);
  }

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
        //fetchChart(selectedEpic)
      ]);
    }
  }

  render() {
    const {
      isLoading,
      confirm,
    } = this.props;

    return conditionalRender(!isLoading, (
      <div>
        <div className="fast-markets__wrapper">
          <div className="fast-markets__trades">
            <MarketDropdown />
            <Ticket />
            <Confirm confirm={confirm} />
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
  confirm: PropTypes.object,
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
    trade: confirm,
  } = state;

  return {
    confirm,
    isLoading,
    selectedEpic,
  };
}

export default connect(mapStateToProps, { fetchMarkets, fetchMarket, fetchChart })(FastMarkets);
