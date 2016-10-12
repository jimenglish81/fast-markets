import * as d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import _ from 'lodash';

export default class Sparkline extends Component {
  render() {
    const width = 90;
    const height = 19;
    const prices = [0,2,4,5,6,2,3,8,2,3,0];
    const xScale = d3.scaleLinear()
                    .range([0, width])
                    .domain([0, prices.length - 1])

    const yScale = d3.scaleLinear()
                    .range([height, 0])
                    .domain(d3.extent(prices));

    const node = ReactFauxDOM.createElement('svg');
    const el = d3.select(node)
      .attr('data', prices)
      .attr('height', height)
      .attr('width', width);

    const line = d3.line()
      .x(function (d, i) {
        return xScale(i);
      })
      .y(function (d) {
        return yScale(d);
      });

    el.append('g')
      .attr('transform', 'translate(0, 2)')
      .append('path')
      .datum(prices)
      .style('stroke', '#1997c6')
      .style('fill', 'none')
      .style('stroke-width', 0.5)
      .attr('d', line);


    // TODO - this will be the strike price
    el.append('line')
       .attr('y1', yScale(4))
       .attr('y2', yScale(4))
       .attr('x1', 0)
       .attr('x2', xScale(prices.length - 1))
       .attr('stroke-width', 1)
       .attr('opacity', 0.6)
       .attr('stroke', 'red');

    return node.toReact();
  }
}
