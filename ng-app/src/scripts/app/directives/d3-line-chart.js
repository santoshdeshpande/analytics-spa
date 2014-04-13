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

        var xScale = d3.scale.linear().range([0, w]);
        var yScale = d3.scale.linear().range([h, 0]).nice();

        scope.$watch('chart', function (newData) {
          scope.render(newData.data, newData.baseline);
        }, true);

        scope.render = function (data, baseline) {
          graph.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            xScale.domain([
              d3.min(data, function(d){ return d[0]; }),
              d3.max(data, function(d){ return d[0]; })
            ]);
            yScale.domain([
              yScaleMin(d3.min(data, function(d){ return d[1]; }), baseline),
              d3.max(data, function(d){ return d[1]; })
            ]);

            var yTicks = [
              d3.min(yScale.ticks()),
              d3.max(yScale.ticks())
            ];

            if (baseline) {
              yTicks.push(baseline);

              // only push middle helper line if far enough from baseline - 15%
              var minDistance = (d3.max(yScale.ticks()) - d3.min(yScale.ticks())) * 0.15;
              if (Math.abs(baseline - d3.mean(yScale.ticks())) > minDistance) {
                yTicks.push(d3.mean(yScale.ticks()));
              }
            } else {
              // always push middle helper line if no baseline to overlap
              yTicks.push(d3.mean(yScale.ticks()));
            }

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(yScale).orient('left').tickValues(yTicks);
            // Add the y-axis to the left
            graph.append('g')
              .attr('class', 'y axis')
              .call(yAxisLeft);

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              .x(function (d) {
                return xScale(d[0]);
              })
              .y(function (d) {
                return yScale(d[1]);
              });

            // helpline
            var xValues = data.map(function(d) { return d[0] });
            angular.forEach(yTicks, function(yValue){
              var path = graph.append('path')
                .attr('d', line([
                  [ xValues[0], yValue ],
                  [ xValues[xValues.length - 1], yValue ]
                ]));

              if (yValue === baseline) {
                path.attr('class', 'axis baseline');
              } else {
                path.attr('class', 'axis helpline');
              }
            });

            // add actual line at the end in order to overlap all others
            graph.append('path').attr('d', line(data));

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
