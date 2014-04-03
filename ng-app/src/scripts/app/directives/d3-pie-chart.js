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
        var bucket = attrs.bucket,
            count = attrs.count;

        var renderTimeout;
        // define dimensions of graph
        var width = 200,
          height = 125,
          radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(['#7fc340', '#a90009', '#ee000d', '#1c9f3f']);

        var arc = d3.svg.arc()
          .outerRadius(radius)
          .innerRadius(0);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function (d) {
            return d[count];
          });

        // Add an SVG element with the desired dimensions and margin.
        var svg = d3.select(ele[0]).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        scope.$watch('data', function (newData) {
          scope.render(newData);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {

            data.forEach(function (d) {
              d[count] = +d[count];
            });

            var g = svg.selectAll(".arc")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "arc");

            g.append("path")
              .attr("d", arc)
              .style("fill", function (d) {
                return color(d.data[bucket]);
              });

            g.append("text")
              .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
              })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function (d) {
                return d.data[bucket];
              });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
