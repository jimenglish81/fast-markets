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
    };
    this.debounceWindowResize = _.debounce(this.windowResize.bind(this), 150);
  }

  windowResize() {
    this.setState({
       parentWidth: findDOMNode(this).parentNode.offsetWidth,
    });
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
    const margin = { top: 20, right: 100, bottom: 40, left: 40 };
    const width = this.state.parentWidth - (margin.left + margin.right);
    const height = 400 - (margin.top + margin.bottom);
    const data = this.props.dataPoints.map(({ timestamp, price }) => ({
      timestamp: d3.timeParse('%Y/%m/%d %H:%M:%S')(timestamp),
      price,
    }));

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
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('data', null);

    const xScale = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(dates))

    //xScale.ticks(d3.timeSecond.every(1))

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain(d3.extent(prices))

    const yAxis = d3.axisRight()
      .scale(yScale)
      .tickSize(-width, 0, 0);


    const xAxis = d3.axisBottom()
      .scale(xScale)
      //.ticks(2, "s")
      // .tickFormat(function(d) {
      //   return d3.timeFormat("%Ss")(d);
      // });

    el.append('g')
      .attr('className', 'sparkline')
    	.attr('transform', `translate(${width}, 0)`)
    	.call(yAxis)

    el.append('g')
      .attr('className', 'sparkline')
      .attr('transform', `translate(0, ${(height)})`)
      .call(xAxis);

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
    el.append('line')
       .attr('y1', yScale( _.get(_.last(data), 'price')))
       .attr('y2', yScale( _.get(_.last(data), 'price')))
       .attr('x1', 0)
       .attr('x2', xScale(_.get(_.last(data), 'timestamp')))
       .attr('stroke-width', 1)
       .attr('opacity', 0.6)
       .attr('stroke', '#1997c6');


    const lastValue = _.get(_.last(data), 'price');
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
