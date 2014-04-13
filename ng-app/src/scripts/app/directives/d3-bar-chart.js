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
    return {
      restrict: 'E',
      scope: {
        chart: '=',
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;
        var dimensions = {
          margins: { top: 10, right: 20, bottom: 10, left: 40 }
        };

        var svg = new Chart(ele[0], dimensions);

        var x = d3.scale.ordinal().rangeRoundBands([0, svg.width()], .1);
        var y = d3.scale.linear().range([svg.height(), 0]);
        var yAxis = d3.svg.axis().scale(y).orient('left');

        scope.$watch('chart', function (newChart) {
          scope.render(newChart.data);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            x.domain(data.map(function (d) { return d[0] }));
            y.domain([0, d3.max(data, function (d) { return d[1] })]);

            var yTicks = [
              d3.min(y.ticks()),
              d3.mean(y.ticks()),
              d3.max(y.ticks())
            ];

            yAxis.tickValues(yTicks);
            svg.append('g')
                  .attr('class', 'y axis')
                  .call(yAxis);

            // helpline
            angular.forEach(yTicks, function(yValue){
              svg.append('path')
                .attr('d', d3.svg.line()([
                  [ 0, y(yValue) ],
                  [ svg.width(), y(yValue) ]
                ]))
                .attr('class', 'axis helpline');
            });

            svg.selectAll('.bar')
                  .data(data)
                .enter().append('rect')
                  .attr('class', 'bar')
                  .attr('x', function(d) { return x(d[0]); })
                  .attr('width', x.rangeBand())
                  .attr('y', function(d) { return y(d[1]); })
                  .attr('height', function(d) { return svg.height() - y(d[1]); });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
