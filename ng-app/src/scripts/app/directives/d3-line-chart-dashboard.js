/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  return ['$timeout', function ($timeout) {

    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      link: function (scope, element, attrs) {
        var renderTimeout;
        var margin = {
          top: 0, right: 0, bottom: 0, left: 0
        };

        // Add an SVG element with the desired dimensions and margin.
        var svg = d3.select(element[0]).append('svg');
        var graph = svg
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        svg.attr( 'height', attrs.height );

        var xScale = d3.scale.linear();
        var yScale = d3.scale.linear();

        var watchTimeout;
        window.onresize = function () {
          if (watchTimeout) {
            clearTimeout(watchTimeout);
          }

          watchTimeout = setTimeout(function () {
            scope.$apply();
          }, 75);
        };

        scope.$watch(function () {
          return element[ 0 ].offsetWidth;
        }, function () {
          scope.render(scope.data);
        });

        scope.$watch('data', function (newData) {
          scope.render(newData);
        }, true);

        scope.render = function (data) {
          var width = element[ 0 ].offsetWidth - margin.left - margin.right;
          var height = element[ 0 ].offsetHeight - margin.top - margin.bottom;

          svg
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

          graph.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) ($timeout.cancel(renderTimeout));

          renderTimeout = $timeout(function () {
            xScale.domain([
              d3.min(data, function(d){ return d[0]; }),
              d3.max(data, function(d){ return d[0]; })
            ]).range([0, width]);
            yScale.domain([
              d3.min(data, function(d){ return d[1]; }),
              d3.max(data, function(d){ return d[1]; })
            ]).range([height, 0]).nice();

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              .x(function (d) {
                return xScale(d[0]);
              })
              .y(function (d) {
                return yScale(d[1]);
              });

            // add actual line at the end in order to overlap all others
            graph.append('path')
              .attr('class', 'line')
              .attr('d', line(data));

            var area = d3.svg.area()
              .x(function (d) {
                return xScale(d[0]);
              })
              .y0(function (d) {
                return yScale(d[1]);
              })
              .y1(height);

            graph.append('path')
              .attr('class', 'area')
              .attr('d', area(data));


          }, 200); // renderTimeout
        };
      }
    };
  }]
});
