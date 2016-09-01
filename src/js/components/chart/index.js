import * as d3 from 'd3';
import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import _ from 'lodash';

const Chart = () => {
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 800 - (margin.left + margin.right);
  const height = 400 - (margin.top + margin.bottom);
  const data = [
    {
    "date": "Tue Jan 28 1986 11:00:00",
    "count": 18
    },
    {
    "date": "Tue Jan 28 1986 11:00:01",
    "count": 26
    },
    {
    "date": "Tue Jan 28 1986 11:00:02",
    "count": 27
    },
    {
    "date": "Tue Jan 28 1986 11:00:03",
    "count": 14
    },
    {
    "date": "Tue Jan 28 1986 11:00:04",
    "count": 23
    },
    {
    "date": "Tue Jan 28 1986 11:00:05",
    "count": 14
    },
    {
    "date": "Tue Jan 28 1986 11:00:06",
    "count": 26
    },
    {
    "date": "Tue Jan 28 1986 11:00:07",
    "count": 34
    },
    {
    "date": "Tue Jan 28 1986 11:00:08",
    "count": 27
    },
    {
    "date": "Tue Jan 28 1986 11:00:09",
    "count": 23
    },
    {
    "date": "Tue Jan 28 1986 11:00:10",
    "count": 14
    },
    {
    "date": "Tue Jan 28 1986 11:00:11",
    "count": 28
    },
    {
    "date": "Tue Jan 28 1986 11:00:12",
    "count": 33
    },
    {
    "date": "Tue Jan 28 1986 11:00:13",
    "count": 33
    },
    {
    "date": "Tue Jan 28 1986 11:00:14",
    "count": 17
    },
    {
    "date": "Tue Jan 28 1986 11:00:15",
    "count": 14
    },
    {
    "date": "Tue Jan 28 1986 11:00:16",
    "count": 29
    },
    {
    "date": "Tue Jan 28 1986 11:00:17",
    "count": 28
    }
  ];

  // TODO - chart subscription
  // this.lsClient.subscribe(
  //   ['CHART:FM.D.GBPJPY24.GBPJPY24.IP:TICK'],
  //   ['BID', 'UTM'],
  //   'DISTINCT',
  //   (itemUpdate) => {
  //     const [,epic] = itemUpdate.getItemName().split(':');
  //     let updates = {};
  //
  //     itemUpdate.forEachChangedField((fid, pos, value) => {
  //       updates[fid] = value;
  //     });
  //
  //     console.log(updates);
  //   }
  // );

  data.forEach(function (d) {
    d.date = d3.timeParse('%a %b %d %Y %H:%M:%S')(d.date);
  });

  const dates = _.map(data, 'date');
  const counts = _.map(data, 'count');

const node = ReactFauxDOM.createElement('svg');
  const el = d3.select(node)
    .attr('data', data)
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
    .attr('preserveAspectRatio', 'xMinYMid')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    .attr('data', null);

  const xScale = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(dates))

  xScale.ticks(d3.timeSecond.every(1))


  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(d3.extent(counts))

  const yAxis = d3.axisRight()
    .scale(yScale)
    .tickSize(-width, 0, 0);

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(function(d) {
      return d3.timeFormat("%Ss")(d);
    });

  el.append('g')
    .attr('className', 'sparkline')
  	.attr('transform', 'translate(' + width + ', 0)')
  	.call(yAxis)


  el.append('g')
    .attr('className', 'sparkline')
    .attr('transform', 'translate(0, '+ (height) + ')')
    .call(xAxis);

  const line = d3.line()
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
    .attr('d', line);

  return node.toReact()
}

export default Chart;
