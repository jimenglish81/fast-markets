import d3 from 'd3';
import React from 'react';
import ReactFauxDOM from 'react-faux-dom';

const Chart = () => {
  const width = 200;
  const height = 200;200
  const data = [85, 66, 71, 10, 5, 16, 71, 1, 16, 24, 54, 85, 37, 36, 43, 67, 63, 23, 96, 53, 25];

  const el = d3.select(ReactFauxDOM.createElement('svg'))
    .attr({
      data,
      height,
      width
    })
    .attr('data', null)

  const x = d3.scale.linear()
    .range([0, width])
    .domain(d3.extent(data, (d, i) => i))

  const y = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(data, (d) => d))

  const line = d3.svg.line()
    .x((d, i) => x(i))
    .y((d) => y(d));

  el.append('path')
    .datum(data)
    .attr({
      key: 'sparkline',
      className: 'sparkline',
      d: line
    })

    return el.node().toReact()
}

export default Chart;
