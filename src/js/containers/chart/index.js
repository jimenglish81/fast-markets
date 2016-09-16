import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChartComponent from '../../components/chart';
import { fetchChart } from '../../actions';

class Chart extends Component {
  componentWillMount() {
    this.props.fetchChart(this.props.selectedEpic);
  }

  render() {
    if (!this.props.dataPoints) {
      return null;
    }
    return (
      <ChartComponent
        dataPoints={this.props.dataPoints}
      />
    );
  }
}

Chart.propTypes = {
  selectedEpic: PropTypes.string,
  fetchChart: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    markets: {
      selectedEpic,
    },
    chart: {
      dataPoints,
    }
  } = state;

  return {
    dataPoints,
    selectedEpic,
  };
}

export default connect(mapStateToProps, { fetchChart })(Chart);
