/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  return ['$timeout', function ($timeout) {

    function yScaleMin(dataMin, baseline) {
      if (!baseline || dataMin < baseline) {
        return 0
      } else {
        return (Math.round(baseline * 10) - 1) / 10.0
      }
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
        //       T   R   B   L
        var m = [10, 20, 10, 35]; // margins
        var w = 260 - m[1] - m[3]; // width
        var h = 160 - m[0] - m[2]; // height

        // Add an SVG element with the desired dimensions and margin.
        var graph = d3.select(ele[0]).append('svg')
          .attr('width', w + m[1] + m[3])
          .attr('height', h + m[0] + m[2])
          .append('g')
          .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')');

        scope.$watch('chart', function (newData) {
          scope.render(newData.data, newData.baseline);
        }, true);

        scope.render = function (data, baseline) {
          graph.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {

            var xScale = d3.scale.linear().domain([
              d3.min(data, function(d){ return d[0]; }),
              d3.max(data, function(d){ return d[0]; })
            ]).range([0, w]);

            var yScale = d3.scale.linear().domain([
              yScaleMin(d3.min(data, function(d){ return d[1]; }), baseline),
              d3.max(data, function(d){ return d[1]; })
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
            var xAxis = d3.svg.axis().scale(xScale).ticks(0);
            // Add the x-axis.
            graph.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + h + ')')
              .call(xAxis);

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(yScale).orient('left').ticks(3);
            // Add the y-axis to the left
            graph.append('g')
              .attr('class', 'y axis')
              .call(yAxisLeft);

            graph.append('path').attr('d', line(data));

            if (baseline) {
              var baselineFn = d3.svg.line()
                            .x(function (d) {
                              return xScale(d[0]);
                            })
                            .y(function () {
                              return yScale(baseline);
                            });

              graph.append('path')
                .attr('d', baselineFn(data))
                .attr('class', 'baseline');
            }

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
