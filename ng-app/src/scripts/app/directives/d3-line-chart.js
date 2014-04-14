/* global
 define: false,
 console: false
 */
define([
  'd3js',
  './chart'
], function (d3, Chart) {
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
        chart: '='
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;

        var dimensions = {
          margins: { top: 10, right: 10, bottom: 10, left: 35 }
        };

        var graph = new Chart(ele[0], dimensions);

        scope.$watch('chart', function (newData) {
          scope.render(newData.data, newData.baseline);
        }, true);

        scope.render = function (data, baseline) {
          graph.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            graph.xScale.domain([
              d3.min(data, function (d) {
                return d[0];
              }),
              d3.max(data, function (d) {
                return d[0];
              })
            ]);
            graph.yScale.domain([
              yScaleMin(d3.min(data, function (d) {
                return d[1];
              }), baseline),
              d3.max(data, function (d) {
                return d[1];
              })
            ]);

            var yTicks = [
              d3.min(graph.yScale.ticks()),
              d3.max(graph.yScale.ticks())
            ];

            if (baseline) {
              yTicks.push(baseline);

              // only push middle helper line if far enough from baseline - 15%
              var minDistance = (d3.max(graph.yScale.ticks()) - d3.min(graph.yScale.ticks())) * 0.15;
              if (Math.abs(baseline - d3.mean(graph.yScale.ticks())) > minDistance) {
                yTicks.push(d3.mean(graph.yScale.ticks()));
              }
            } else {
              // always push middle helper line if no baseline to overlap
              yTicks.push(d3.mean(graph.yScale.ticks()));
            }

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(graph.yScale).orient('left').tickValues(yTicks);
            // Add the y-axis to the left
            graph.append('g')
              .attr('class', 'y axis')
              .call(yAxisLeft);

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              .x(function (d) {
                return graph.xScale(d[0]);
              })
              .y(function (d) {
                return graph.yScale(d[1]);
              });

            var area = d3.svg.area()
              .x(function (d) {
                return graph.xScale(d[0]);
              })
              .y0(function (d) {
                return graph.yScale(d[1]);
              })
              .y1(graph.height());

            graph.append('path')
              .attr('class', 'area')
              .attr('d', area(data));


            // helpline
            var xValues = data.map(function (d) {
              return d[0]
            });
            angular.forEach(yTicks, function (yValue) {
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
            var path = graph.append('path').attr('d', line(data));

            var totalLength = path.node().getTotalLength();

            path
              .attr("stroke-dasharray", totalLength + " " + totalLength)
              .attr("stroke-dashoffset", totalLength)
              .transition()
              .duration(300)
              .ease("linear")
              .attr("stroke-dashoffset", 0);

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
