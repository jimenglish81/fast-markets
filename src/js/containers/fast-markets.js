import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  fetchMarkets,
  fetchMarket
} from '../actions';
import Loader from '../components/common/loader';
import Chart from './chart';
import MarketDropdown from './market-dropdown';
import Ticket from './ticket';
import Positions from './positions';
import { conditionalRender } from '../utils';

// TODO does MarketDropdown need to be a container? Loading could be market?
class FastMarkets extends Component {
  constructor(props) {
    super(props);
  }

  // TODO - Promise.all
  componentWillMount() {
    this.props.fetchMarkets();
  }

  componentWillUpdate({ selectedEpic }) {
    if (selectedEpic !== this.props.selectedEpic) {
      this.props.fetchMarket(selectedEpic);
    }
  }

  render() {
    const { isLoading } = this.props;

    return conditionalRender(!isLoading, (
      <div>
        <div className="fast-markets__wrapper">
          <div className="fast-markets__trades">
            <MarketDropdown />
            <Ticket />
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
  isLoading: PropTypes.bool.isRequired,
};


FastMarkets.defaultProps = {
  isLoading: true,
};

function mapStateToProps(state) {
  const {
    markets: {
      markets,
      selectedEpic,
      isLoading,
    },
  } = state;

  return {
    //markets,
    isLoading,
    selectedEpic,
  };
}

export default connect(mapStateToProps, { fetchMarkets, fetchMarket })(FastMarkets);
