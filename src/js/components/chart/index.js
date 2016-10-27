import * as d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import _ from 'lodash';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentWidth: 0,
      parentHeight: 0,
    };
    this.debounceWindowResize = _.debounce(this.windowResize.bind(this), 150);
  }

  windowResize() {
    const { parentNode } = findDOMNode(this);
    const svg = parentNode.querySelector('svg');

    // toggle visibility to allow for flexbox resize.
    svg.style.display = 'none';

    this.setState({
       parentWidth: parentNode.offsetWidth,
       parentHeight: parentNode.offsetHeight,
    });

    svg.style.display = 'block';
  }

  /**
   * Attach window resize.
   * @private
   */
  componentDidMount() {
    window.addEventListener('resize', this.debounceWindowResize);
    this.windowResize();
  }

  /**
   * Detach window resize.
   * @private
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceWindowResize);
  }

  render() {
    const isNarrow = this.state.parentWidth <= 570;
    const margin = !isNarrow ?
      { top: 20, right: 80, bottom: 40, left: 40 }
      :
      { top: 10, right: 10, bottom: 10, left: 10 };
    const width = this.state.parentWidth - (margin.left + margin.right);
    const height = this.state.parentHeight - (margin.top + margin.bottom);
    const data = _.uniqBy(this.props.dataPoints.map(({ timestamp, price }) => ({
      timestamp: d3.timeParse('%Y/%m/%d %H:%M:%S')(timestamp),
      price,
    })),  (d) => d.timestamp.toJSON());

    const dates = _.map(data, 'timestamp');
    const prices = _.map(data, 'price');

    const node = ReactFauxDOM.createElement('svg');
    const el = d3.select(node)
      .attr('data', data)
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.left + margin.right)
      .attr('viewBox', `0 0 ${(width + margin.left + margin.right)} ${(height + margin.top + margin.bottom)}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(dates))

    const [ min, max ] = d3.extent(prices);
    const padding = (max - min) / 2;
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([min - padding, max + padding]);

    if (!isNarrow) {
      const yAxis = d3.axisRight()
        .scale(yScale)
        .tickSize(-width, 0, 0);

      const xAxis = d3.axisBottom()
        .ticks(d3.timeSecond, 10)
        .scale(xScale)
        .tickFormat(d3.timeFormat('%H:%M:%S'));

      el.append('g')
        .attr('className', 'sparkline')
      	.attr('transform', `translate(${width}, 0)`)
      	.call(yAxis)

      el.append('g')
        .attr('className', 'sparkline')
        .attr('transform', `translate(0, ${(height)})`)
        .call(xAxis)
        .selectAll('text')
        .attr('font-size', '9px')
        .attr('y', 0)
        .attr('x', 9)
        .attr('dy', '.35em')
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start');
    }

    const line = d3.line()
      .x(function (d) {
        return xScale(d.timestamp);
      })
      .y(function (d) {
        return yScale(d.price);
      });

    el.append('g')
      .append('path')
      .datum(data)
      .attr('className', 'chart-line')
      .attr('d', line);

    // TODO - add positions, color dependant on winning or losing
    // width should be baed on position.expiryTime or last timestamp (whicheven shorter)
    // could be a selectedPsotion if chart gets too budy
    // hover on line then shows price
    const lastValue = _.get(_.last(data), 'price');
    el.append('line')
       .attr('y1', yScale(lastValue))
       .attr('y2', yScale(lastValue))
       .attr('x1', 0)
       .attr('x2', xScale(_.get(_.last(data), 'timestamp')))
       .attr('stroke-width', 1)
       .attr('opacity', 0.6)
       .attr('stroke', '#1997c6');

    const g = el.append('g')
      .attr('width', 50)
      .attr('height', 16)
      .attr('transform', `translate(${(width - 50)}, ${(yScale(lastValue) - 8)})`);

    g.append('rect')
      .attr('className', 'current-price')
      .attr('width', 50)
      .attr('height', 16);

    g.append('text')
      .attr('x', 5)
      .attr('y', 8)
  		.attr('dy', '.35em')
  		.attr('text-anchor', 'start')
      .attr('stroke', '#1997c6')
      .attr('font-size', '10px')
  		.text(lastValue);

    return node.toReact();
  }
}

Chart.propTypes = {
  dataPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
