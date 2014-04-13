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
        label: '@',
        onClick: '&'
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;
        var dimensions = {
          margins: { top: 10, right: 0, bottom: 10, left: 35 }
        };

        var svg = new Chart(ele[0], dimensions);

        var xScale = d3.scale.ordinal().rangeBands([0, svg.width()]).rangeBands([0, svg.width()]);
        var yScale = d3.scale.linear().range([svg.height(), 0]);

        scope.$watch('chart', function (newChart) {
          scope.render(newChart.data);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            xScale.domain(data.map(function (d) { return d[0] + '' }));
            yScale.domain([0, d3.max(data, function (d) { return d[1] })]);

            // create left yAxis
            var yTicks = [0.0, 0.5, 1.0];
            var yAxisLeft = d3.svg.axis().scale(yScale).orient('left').tickValues(yTicks);
            svg.append('g')
              .attr('class', 'y axis')
              .call(yAxisLeft);

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              // assign the X function to plot our line as we wish
              .x(function (d) {
                return xScale(d[0]);
              })
              .y(function (d) {
                return yScale(d[1]);
              });

            // helpline
            var xValues = data.map(function(d) { return d[0] });
            angular.forEach(yTicks, function(yValue){
              svg.append('path')
                .attr('d', line([
                  [ xValues[0], yValue ],
                  [ xValues[xValues.length - 1], yValue ]
                ]))
                .attr('class', 'axis helpline');
            });

            // baseline
            svg.append('path')
              .attr('d', line([[0,0], [1,1]]))
              .attr('class', 'baseline');

            // actual plot
            svg.append('path').attr('d', line(data));

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
