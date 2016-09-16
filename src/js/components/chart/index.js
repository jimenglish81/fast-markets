import * as d3 from 'd3';
import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import _ from 'lodash';

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

const Chart = (props) => {
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 800 - (margin.left + margin.right);
  const height = 400 - (margin.top + margin.bottom);

  // const data = raw.map(({ timestamp, closePrice: { bid: price } }) => ({
  //   timestamp,
  //   price,
  // }));

  const data = props.dataPoints.map(({ timestamp, price }) => ({
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
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
    .attr('preserveAspectRatio', 'xMinYMid')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
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
  	.attr('transform', 'translate(' + width + ', 0)')
  	.call(yAxis)


  el.append('g')
    .attr('className', 'sparkline')
    .attr('transform', 'translate(0, '+ (height) + ')')
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
    .attr('className', 'sparkline')
    .attr('d', line);

  const lastValue = data[data.length - 1].price;
  const g = el.append("g")
    .attr('width', 50)
    .attr('height', 16)
    .attr("transform", "translate(" + (width - 50) + "," + (yScale(lastValue) - 8) + ")");

    g.append("rect")
      .attr('width', 50)
      .attr('height', 16)

  g.append("text")
    .attr("x", 16)
    .attr("y",  8)
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
    .attr('className', 'sparkline')
		.text(lastValue);

  return node.toReact();
}

export default Chart;
