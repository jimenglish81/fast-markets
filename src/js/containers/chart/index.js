import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChartComponent from '../../components/chart';
import { conditionalRender } from '../../utils';
import { fetchChart } from '../../actions';

class Chart extends Component {
  render() {
    const {
      isLoading,
      dataPoints,
    } = this.props;

    return conditionalRender(!isLoading, (
      <ChartComponent
        dataPoints={dataPoints}
      />
    ));
  }
}

Chart.propTypes = {
  selectedEpic: PropTypes.string,
  fetchChart: PropTypes.func.isRequired,
  dataPoints: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

Chart.defaultProps = {
  isLoading: true,
};

function mapStateToProps(state) {
  const {
    markets: {
      selectedEpic,
    },
    chart: {
      dataPoints,
      isLoading,
    }
  } = state;

  return {
    dataPoints,
    isLoading,
    selectedEpic,
  };
}

export default connect(mapStateToProps, { fetchChart })(Chart);
