import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  fetchMarkets,
  fetchMarket
} from '../actions';
import Chart from '../components/chart';
import MarketDropdown from '../containers/market-dropdown';
import Ticket from './ticket';
import { conditionalRender } from '../utils';

// TODO does MarketDropdown need to be a container
class Sprints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    this.props.fetchMarkets();
  }

  componentWillUpdate({ selectedEpic }) {
    if (selectedEpic !== this.props.selectedEpic) {
      this.setState({
        isLoading: true,
      });
      this.props.fetchMarket(selectedEpic)
        .then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { isLoading } = this.state;

    return conditionalRender(!isLoading, (
      <div>
        <MarketDropdown />
        <Ticket />
        <Chart />
      </div>
    ));
  }
}

Sprints.propTypes = {
  selectedEpic: PropTypes.string,
  fetchMarkets: PropTypes.func.isRequired,
  fetchMarket: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    markets: {
      markets,
      selectedEpic,
    },
  } = state;

  return {
    //markets,
    selectedEpic,
  };
}

export default connect(mapStateToProps, { fetchMarkets, fetchMarket })(Sprints);
