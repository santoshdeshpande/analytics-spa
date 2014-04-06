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

        var bucket = attrs.bucket,
            count = attrs.count;

        // define dimensions of graph
        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
          width = 260 - margin.left - margin.right,
          height = 160 - margin.top - margin.bottom,
          radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(['#7fc340', '#a90009', '#ee000d', '#1c9f3f']);

        var arc = d3.svg.arc()
          .outerRadius(radius)
          .innerRadius(0);

        var pie = d3.layout.pie()
//          .sort(null)
          .value(function (d) {
            return d[count];
          });

        // Add an SVG element with the desired dimensions and margin.
        var svg = d3.select(ele[0]).append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


        scope.$watch('data', function (newData) {
          scope.render(newData);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);
          // convert all to numbers
          data.forEach(function (d) {
            d[count] = +d[count];
          });

          renderTimeout = $timeout(function () {
            var g = svg.selectAll('.arc')
                .data(pie(data))
              .enter().append('g')
                .attr('class', 'arc')
                .attr('transform', 'translate(45,0)'); // push left to make room for legend

            g.append('path')
              .attr('d', arc)
              .style('fill', function (d) {
                return color(d.data[bucket]);
              });

            // add legend
            var legend = svg.append('g')
              .attr('class', 'legend')
              .attr('height', 100)
              .attr('width', 100)
              .attr('transform', 'translate(-320,-80)');

            legend.selectAll('rect')
                .data(data)
              .enter()
                .append('rect')
                .attr('x', width - 65)
                .attr('y', function (d, i) {
                  return i * 20;
                })
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', function (d) {
                  return color(d[bucket]);
                });

            legend.selectAll('text')
                .data(data)
              .enter()
                .append('text')
                .attr('x', width - 52)
                .attr('y', function (d, i) {
                  return i * 20 + 9;
                })
                .text(function (d) {
                  return d[bucket];
                });
            // end legend


//            g.append('text')
//              .attr('transform', function (d) {
//                return 'translate(' + arc.centroid(d) + ')';
//              })
//              .attr('dy', '.35em')
//              .style('text-anchor', 'middle')
//              .text(function (d) {
//                return d.data[bucket];
//              });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
