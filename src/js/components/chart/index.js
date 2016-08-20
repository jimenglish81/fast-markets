import d3 from 'd3';
import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import _ from 'lodash';

const Chart = () => {
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const data = [
    {
    "date": "20140101",
    "count": 18
    },
    {
    "date": "20140116",
    "count": 26
    },
    {
    "date": "20140201",
    "count": 27
    },
    {
    "date": "20140216",
    "count": 14
    },
    {
    "date": "20140301",
    "count": 23
    },
    {
    "date": "20140316",
    "count": 14
    },
    {
    "date": "20140401",
    "count": 26
    },
    {
    "date": "20140416",
    "count": 34
    },
    {
    "date": "20140501",
    "count": 27
    },
    {
    "date": "20140516",
    "count": 23
    },
    {
    "date": "20140601",
    "count": 14
    },
    {
    "date": "20140616",
    "count": 28
    },
    {
    "date": "20140701",
    "count": 33
    },
    {
    "date": "20140716",
    "count": 33
    },
    {
    "date": "20140801",
    "count": 17
    },
    {
    "date": "20140816",
    "count": 14
    },
    {
    "date": "20140901",
    "count": 29
    },
    {
    "date": "20140916",
    "count": 28
    }
  ];

  data.forEach(function (d) {
    d.date = d3.time.format("%Y%m%d").parse(d.date);
  });

  const dates = _.map(data, 'date');
  const counts = _.map(data, 'count');

  const el = d3.select(ReactFauxDOM.createElement('svg'))
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr({
      data,
      height,
      width
    })
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    .attr('data', null);

  const xScale = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(dates));

  const yScale = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(counts));

  const yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  const xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

  el.append('g')
    .attr('className', 'sparkline')
  	.attr('transform', 'translate(30, 0)')
  	.call(yAxis);

  el.append('g')
    .attr('className', 'sparkline')
    .attr('transform', 'translate(0, '+ (height - 30) + ')')
    .call(xAxis);

  const line = d3.svg.line()
    //.interpolate('bundle')
    .x(function (d) {
      return xScale(d.date);
    })
    .y(function (d) {
      return yScale(d.count);
    });

  el.append('g')
    .append('path')
    .datum(data)
    .attr('className', 'sparkline')
    .attr('d', line)

    return el.node().toReact()
}

export default Chart;
