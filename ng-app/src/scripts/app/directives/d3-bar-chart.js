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
        chart: '=',
        label: '@',
        onClick: '&'
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;
        // define dimensions of graph
        var margin = { top: 10, right: 20, bottom: 10, left: 40 },
          width = 260 - margin.left - margin.right,
          height = 160 - margin.top - margin.bottom;

        var x = d3.scale
          .ordinal()
          .rangeRoundBands([0, width], .1);
        var y = d3.scale
          .linear()
          .range([height, 0]);

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

        var svg = d3.select(ele[0]).append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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
                  [ width, y(yValue) ]
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
                  .attr('height', function(d) { return height - y(d[1]); });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
