/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  return ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;
        // define dimensions of graph
        //       T   R   B   L
        var m = [20, 20, 20, 35]; // margins
        var w = 260 - m[1] - m[3]; // width
        var h = 120 - m[0] - m[2]; // height

        // Add an SVG element with the desired dimensions and margin.
        var graph = d3.select(ele[0]).append("svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
          .append("g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

        scope.$watch('data', function (newData) {
          scope.render(newData);
        }, true);

        scope.render = function (data) {
          graph.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {

            var xScale = d3.scale.linear().domain([
              d3.min(data, function(d){ return d[0]; }),
              d3.max(data, function(d){ return d[0]; })
            ]).range([0, w]);

            var yScale = d3.scale.linear().domain([
              d3.min(data, function(d){ return d[1]; }),
              Math.floor(d3.max(data, function(d){ return d[1]; })) + 1.0
            ]).range([h, 0]).nice();

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              .x(function (d) {
                return xScale(d[0]);
              })
              .y(function (d) {
                return yScale(d[1]);
              });

            // create yAxis
            var xAxis = d3.svg.axis().scale(xScale).ticks(5);
            // Add the x-axis.
            graph.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + h + ")")
              .call(xAxis);

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(yScale).ticks(4).orient("left");
            // Add the y-axis to the left
            graph.append("g")
              .attr("class", "y axis")
//              .attr("transform", "translate(-25,0)")
              .call(yAxisLeft);

            // Add the line by appending an svg:path element with the data line we created above
            // do this AFTER the axes above so that the line is above the tick-lines
            graph.append("path").attr("d", line(data));

            var watermark = d3.svg.line()
                          .x(function (d) {
                            return xScale(d[0]);
                          })
                          .y(function (d) {
                            return yScale(1.0);
                          });

            graph.append("path")
              .attr("d", watermark(data))
              .attr('class', 'watermark');

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
