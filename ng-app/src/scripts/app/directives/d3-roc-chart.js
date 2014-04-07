/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  return ['$timeout', function ($timeout) {
    function relaxedTickValues(values) {
      var tickValues = [];
      for (var i = 0; i < values.length; i++) {
        if ((i === 0) || (i % 3 === 0) || (i == (values.length - 1)))
          tickValues.push(values[i])
      }
      return tickValues;
    }

    return {
      restrict: 'E',
      scope: {
        chart: '=',
        label: '@',
        onClick: '&'
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;
        // define dimensions of graph
        var m = [10, 20, 45, 35]; // margins
        var w = 260 - m[1] - m[3]; // width
        var h = 160 - m[0] - m[2]; // height

        // Add an SVG element with the desired dimensions and margin.
        var svg = d3.select(ele[0]).append('svg')
          .attr('width', w + m[1] + m[3])
          .attr('height', h + m[0] + m[2])
          .append('g')
          .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')');

        scope.$watch('chart', function (newChart) {
          scope.render(newChart.data);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {

            var xScale = d3.scale.ordinal().domain(data.map(function (d) {
              return d[0] + '';
            })).rangeBands([0, w]);
            var yScale = d3.scale.linear().domain([0, d3.max(data, function (d) {
              return d[1];
            })]).range([h, 0]);

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              // assign the X function to plot our line as we wish
              .x(function (d) {
                return xScale(d[0]);
              })
              .y(function (d) {
                return yScale(d[1]);
              });

            // create yAxis
            var xAxis = d3.svg.axis().scale(xScale).ticks(4)
              .tickValues(relaxedTickValues(data.map(function (d) { return d[0] })))
              .tickFormat(d3.format('.3f'));
            // Add the x-axis.
            svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + h + ')')
              .call(xAxis)
              .selectAll('text')
              .style('text-anchor', 'end')
              .attr('dx', '-.8em')
              .attr('dy', '.15em')
              .attr('transform', function (d) {
                return 'rotate(-65)'
              });

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(yScale).orient('left');
            svg.append('g')
              .attr('class', 'y axis')
              .call(yAxisLeft);

            svg.append('path').attr('d', line(data));

            svg.append('path')
              .attr('d', line([[0,0], [1,1]]))
              .attr('class', 'baseline');

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
