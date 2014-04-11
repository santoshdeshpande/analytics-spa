/* global
 define: false,
 console: false
 */
define([
  'd3js',
  'lodash'
], function (d3, _) {
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
        // define dimensions of graph

        var margin = { top: 100, right: 10, bottom: 10, left: 30 },
            width  = 840 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

//        window.d3 = d3

        var x = d3.scale.ordinal().domain(d3.range(0,32)).rangeRoundBands([0, width], .35);
        var y = d3.scale.linear().range([height, 0]);
        var yAxis = d3.svg.axis().scale(y).orient('left');
        var svg = d3.select(ele[0]).append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var defs = svg.append( 'defs' );
        var gradientForegroundPurple = defs.append( 'linearGradient' )
                                           .attr( 'id', 'gradientForegroundPurple' )
                                           .attr( 'x1', '0' )
                                           .attr( 'x2', '0' )
                                           .attr( 'y1', '0' )
                                           .attr( 'y2', '1' );

        gradientForegroundPurple.append( 'stop' )
                                .attr( 'stop-color', '#E3D6F6' )
                                .attr( 'offset', '0%' );

        gradientForegroundPurple.append( 'stop' )
                                .attr( 'stop-color', '#6418A2' )
                                .attr( 'offset', '100%' );

        scope.$watch('data', function (newData) {
          scope.render(angular.copy(newData));
        }, true);

        scope.render = function (data) {
          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {
            y.domain([0, d3.max(data, function (d) { return d.drift })]);

            // helplines
            var yHelplineTicks = _.filter(y.ticks(), function(ele, i){ return i % 2 == 0});

            var line = d3.svg.line()
              .x(function (d) { return x(d[0]) - 15 })
              .y(function (d) { return y(d[1]) });

            angular.forEach(yHelplineTicks, function(yValue){
              var path = svg.append('path')
                .attr('d', line([
                  [ 0, yValue ],
                  [ 31, yValue ]
                ]))
                .attr('class', 'helpline');
            });

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(y).orient('left'); //.tickValues(yTicks);
            svg.append('g')
              .attr('transform', 'translate(5,0)')
              .attr('class', 'y axis')
              .call(yAxisLeft);

            // bars
            svg.selectAll('.bar')
              .data(data)
              .enter().append('rect')
              .attr('class', function(d) { return d.drift > d.kpi ? 'bar' : 'bar solid' })
              .attr('x', function (d, i) { return x(i) })
              .attr('width', x.rangeBand())
              .attr('y', function (d) { return y(d.drift) })
              .attr('height', function (d) {
                return height - y(d.drift);
              });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
