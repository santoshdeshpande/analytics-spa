/* global
 define: false,
 console: false
 */
define([
  'd3js',
  'lodash'
], function (d3, _) {
  'use strict';

  return ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;
        // define dimensions of graph


        var $element = angular.element( ele[0] );
        var margin = { top: 10, right: 10, bottom: 20, left: 30 },
            width  = ele[0].offsetWidth - margin.left - margin.right,
            height = ele[0].offsetHeight - margin.top - margin.bottom;

        var format = d3.format('.4f');
        var x = d3.scale.ordinal().domain(d3.range(0,32)).rangeRoundBands([0, width], .35);
        var y = d3.scale.linear().range([height, 0]);
        var svg = d3.select(ele[0]).append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

        var gradId = 'gradientForegroundPurple' + Math.round( 999999 * Math.random() );

        var defs = svg.append('defs');
        var gradientForegroundPurple = defs.append('linearGradient')
          .attr('id', gradId)
          .attr('x1', '0').attr('x2', '0').attr('y1', '0').attr('y2', '1');
        var stop1 = gradientForegroundPurple.append('stop')
          .attr('stop-color', $element.css('border-top-color'))
          .attr('offset', '0%');
        var stop2 = gradientForegroundPurple.append('stop')
          .attr('stop-color', $element.css('border-bottom-color'))
          .attr('offset', '100%');

        var graph = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        scope.$watch('data', function (newData) {
          scope.render(angular.copy(newData));
        }, true);

        $rootScope.$on('themeChanged', function () {
          stop1.attr('stop-color', $element.css('border-top-color'));
          stop2.attr('stop-color', $element.css('border-right-color'));
        });

        scope.render = function (data) {
          graph.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {

            y.domain([0, d3.max(data, function (d) { return d.drift })]);

            // helplines
            var yHelplineTicks = _.filter(y.ticks(), function(ele, i){ return i % 2 == 0});

            var helpline = d3.svg.line()
              .x(function (d) { return x(d[0]) - 15 })
              .y(function (d) { return y(d[1]) });

            angular.forEach(yHelplineTicks, function(yValue){
              var path = graph.append('path')
                .attr('d', helpline([
                  [ 0, yValue ],
                  [ 31, yValue ]
                ]))
                .attr('class', 'helpline');
            });

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(y).orient('left');
            graph.append('g')
              .attr('transform', 'translate(5,0)')
              .attr('class', 'y axis')
              .call(yAxisLeft);

            // bars
            var bars = graph.selectAll('.bar')
              .data(data)
              .enter()
                .append('rect')
                  .attr('fill', 'url(#' + gradId + ')')
                  .attr('height', 0 )
                  .attr('y', height )
                  .attr('class', function(d) { return d.drift > d.threshold ? 'bar' : 'bar solid' })

            bars.transition()
              .duration( 500 )
                .delay( function ( d, i ) {
                  return i * 20;
                })
                .attr('x', function (d, i) { return x(i) })
                  .attr('width', x.rangeBand())
                  .attr('y', function (d) { return y(d.drift) })
                  .attr('height', function (d) {
                    return height - y(d.drift);
                  });

            //////////////////////////////////

            if (attrs.mode == 'learning') {
              return
            }

            // threshold line
            var thresholds = data.map(function(d) { return d.threshold });
            var thresholdChangeIndexes = [];
            var thresholdLineData = [];
            for (var i = 0; i < thresholds.length; i++) {
              thresholdLineData.push([i, thresholds[i]]);
              if (thresholds[i] !== thresholds[i+1]) {
                thresholdChangeIndexes.push(i);
                thresholdLineData.push([i+1, thresholds[i]]);
              }
            }
            var thresholdLine = d3.svg.line()
              .x(function (d) { return x(d[0]) - x.rangeBand()})
              .y(function (d) { return y(d[1]) });

            var path = graph.append('path')
              .attr('d', thresholdLine(thresholdLineData))
              .attr('stroke-dasharray', '5 , 5')
              .attr('class', 'threshold-line');

            var labelEnter = graph.selectAll('.threshold-label')
              .data(data.filter(function(d, i) { return thresholdChangeIndexes.indexOf(i) > -1 }))
              .enter().append('g')
              .attr('class', 'threshold-label')
              .attr('transform', function(d) {
                return 'translate(' + (x(data.indexOf(d)) - 28) + ',' + (y(d.threshold) - 40) + ')';
              });

            labelEnter.append('rect')
              .attr('width', 68)
              .attr('height', 30)
              .attr('rx', '3')
              .attr('ry', '3');

            labelEnter.append('text')
              .attr('dx', '2.1em')
              .attr('dy', '1.3em')
              .style('text-anchor', 'middle')
              .text(function(d){ return format(d.threshold) });

            var legend = graph.append('g')
                .attr('transform', 'translate(' + (x(29)) + ',' + (y(0) - 15) + ')');

            legend.append('rect')
                .attr('class', 'legend')
                .attr('width', 90)
                .attr('height', 30)
                .attr('rx', '3')
                .attr('ry', '3');

            legend.append('text')
              .attr('dx', '2.8em')
              .attr('dy', '1.3em')
              .style('text-anchor', 'middle')
              .text('Last ' + data.length + ' runs');

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
