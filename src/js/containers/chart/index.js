import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChartComponent from '../../components/chart';
import { conditionalRender } from '../../utils';
import { fetchChart } from '../../actions';

// TODO - top level sprints load all?
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  getChartData() {
    this.props.fetchChart(this.props.selectedEpic)
        .then(() => this.setState({ isLoading: false }));
  }

  componentWillMount() {
    this.getChartData();
  }

  componentWillUpdate({ selectedEpic }) {
    if (selectedEpic !== this.props.selectedEpic) {
      this.setState({
        isLoading: true,
      });

      this.getChartData();
    }
  }

  render() {
    const { isLoading } = this.state;

    return conditionalRender(!isLoading, (
      <ChartComponent
        dataPoints={this.props.dataPoints}
      />
    ), (
      <div>loading...</div>
    ));
  }
}

Chart.propTypes = {
  selectedEpic: PropTypes.string,
  fetchChart: PropTypes.func.isRequired,
  dataPoints: PropTypes.arrayOf(PropTypes.object),
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
