/* global
 define: false,
 console: false
 */
define([
  'd3js',
  './chart'
], function (d3, Chart) {
  'use strict';

  function colorScale( element ) {
    return d3.scale.ordinal().range([
      element.css('border-top-color'),
      element.css('border-right-color'),
      element.css('border-bottom-color'),
      element.css('border-left-color')
    ]);
  }

  function sortData( data ) {
    var legendOrdered = [ 'True Positives', 'True Negatives', 'False Positives',  'False Negatives' ];

    return data.sort( function ( a, b ) {
      var indexA = legendOrdered.indexOf(a.bucket);
      var indexB = legendOrdered.indexOf(b.bucket);

      if (indexA > indexB) return 1;
      if (indexA < indexB) return -1;

      return 0;
    });
  }

  return ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        chart: '='
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;

        var dimensions = {
          margins: { top: 0, right: 0, bottom: 10, left: 0 }
        };
        var svg = new Chart(ele[0], dimensions);
        svg.attr('transform', 'translate(' + svg.width() / 2 + ',' + svg.height() / 2 + ')');
        var radius = Math.min(svg.width(), svg.height()) / 2;

        var $element = angular.element( ele[0] );
        var color = colorScale($element);
        $rootScope.$on('themeChanged', function () {
          color = colorScale($element);
        });

        var arc = d3.svg.arc()
          .outerRadius(radius)
          .innerRadius(0);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function (d) {
            return +d[count];
          });

        var bucket = attrs.bucket,
            count = attrs.count;

        scope.$watch('chart', function (newChart) {
          if (newChart !== null) scope.render(newChart.data);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);
          data = sortData(data);

          renderTimeout = $timeout(function () {
            var g = svg.selectAll('.arc')
                .data(pie(data))
              .enter().append('g')
                .attr('class', 'arc')
                .attr('transform', 'translate(45,0)') // push left to make room for legend
                .on('mouseover', function (d) {
                  d3.select(this)
                    .classed('active', true);
                })
                .on('mouseout', function (d) {
                  d3.select(this)
                    .classed('active', false);
                });

            g.append('path')
              .attr('d', arc)
              .style('fill', function (d) {
                return color(d.data[bucket]);
              });


            var total = d3.sum(data, function(d) { return d.count; });
            var percentageScale = d3.scale.linear().domain([0, total]).range([0, 1]);
            var percentageFormat = d3.format('.0%');

            g.append('text')
              .attr('transform', function (d) {
                var c = arc.centroid(d);
                return 'translate(' + c[0] * 1.3 + ',' + c[1] + ')';
              })
              .attr('text-anchor', 'middle')
              .text(function (d) {
                return percentageFormat( percentageScale( d.data[count] ) );
              });

            // add legend
            var legend = svg.append('g')
              .attr('class', 'legend')
              .attr('height', 100)
              .attr('width', 100)
              .attr('transform', 'translate(-400,-60)');

            legend.selectAll('rect')
                .data(data)
              .enter()
                .append('rect')
                .attr('x', svg.width() - 65)
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
                .attr('x', svg.width() - 52)
                .attr('y', function (d, i) {
                  return i * 20 + 9;
                })
                .text(function (d) {
                  return d[bucket];
                });
            // end legend

          }, 200); // renderTimeout
        };
      }
    };
  }];
});
