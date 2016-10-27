import * as d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import ReactFauxDOM from 'react-faux-dom';

const TAU = 2 * Math.PI;

class CountDown extends Component {
  render() {
    const arc = d3.arc()
      .innerRadius(60)
      .outerRadius(80)
      .startAngle(0);

    const node = ReactFauxDOM.createElement('svg');
    const svg = d3.select(node)
    const g = svg.append('g')
      .attr('transform', `translate(${200 / 2},${200 / 2})`);

    const background = g.append('path')
      .datum({ endAngle: TAU })
      .style('fill', '#1a1c22')
      .attr('d', arc);

    const foreground = g.append('path')
      .datum({ endAngle: 0.127 * TAU })
      .style('fill', 'orange')
      .attr('d', arc);

    return node.toReact();
  }
}

export default CountDown;
