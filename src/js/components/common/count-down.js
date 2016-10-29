import * as d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import ReactFauxDOM from 'react-faux-dom';

const TAU = 2 * Math.PI;
// createdDate: "2016-10-27T19:30:51"
// expiryTime:"2016-10-27T19:50:51"
// end.diff(start, 'seconds')

class CountDown extends Component {
  render() {
    const {
      background,
      foreground,
      percentage
    } = this.props;
    const arc = d3.arc()
      .innerRadius(5)
      .outerRadius(8)
      .startAngle(0);

    const node = ReactFauxDOM.createElement('svg');
    const svg = d3.select(node)
      .attr('height', 18)
      .attr('width', 16);
    const g = svg.append('g')
      .attr('transform', `translate(${8},${10})`);

    g.append('path')
      .datum({ endAngle: TAU })
      .style('fill', background)
      .attr('d', arc);

    g.append('path')
      .datum({ endAngle: percentage * TAU })
      .style('fill', foreground)
      .attr('d', arc);

    return node.toReact();
  }
}

CountDown.propTypes = {
  background: PropTypes.string,
  foreground: PropTypes.string,
  percentage: PropTypes.number,
};

export default CountDown;
