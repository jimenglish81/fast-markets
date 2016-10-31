import * as d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import _ from 'lodash';

const Sparkline = (props) => {
  const {
    height,
    isWinning,
    prices,
    strikeLevel,
    width,
  } = props;

  if (!prices || prices.length < 2) {
    return null;
  }

  const xScale = d3.scaleLinear()
                  .range([0, width])
                  .domain([0, prices.length - 1])

  const [min, max] = d3.extent(prices);
  const diff = Math.max(strikeLevel - min, max - strikeLevel);
  const yScale = d3.scaleLinear()
                  .range([height, 0])
                  .domain([strikeLevel - diff, strikeLevel + diff]);

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
      return yScale(+d);
    });

  el.append('g')
    .append('path')
    .datum(prices)
    .style('stroke', '#1997c6')
    .style('fill', 'none')
    .style('stroke-width', 1.5)
    .attr('d', line);

  el.append('line')
     .attr('y1', yScale(strikeLevel))
     .attr('y2', yScale(strikeLevel))
     .attr('x1', 0)
     .attr('x2', xScale(prices.length - 1))
     .style('stroke-width', 1.5)
     .style('stroke', isWinning ? '#1bc98e' : '#e64759')
     .style('opacity', 1);

  return node.toReact();
}

Sparkline.propTypes = {
  height: PropTypes.number,
  isWinning: PropTypes.bool,
  prices: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number,
};

export default Sparkline;
