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

        var margin = { top: 100, right: 10, bottom: 20, left: 30 },
            width  = 840 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        var format = d3.format('.4f');
        var x = d3.scale.ordinal().domain(d3.range(0,32)).rangeRoundBands([0, width], .35);
        var y = d3.scale.linear().range([height, 0]);
        var svg = d3.select(ele[0]).append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

        var graph = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var defs = svg.append('defs');
        var gradientForegroundPurple = defs.append('linearGradient')
          .attr('id', 'gradientForegroundPurple')
          .attr('x1', '0').attr('x2', '0').attr('y1', '0').attr('y2', '1');
        gradientForegroundPurple.append('stop')
          .attr('stop-color', '#E3D6F6')
          .attr('offset', '0%');
        gradientForegroundPurple.append('stop')
          .attr('stop-color', '#6418A2')
          .attr('offset', '100%');

        scope.$watch('data', function (newData) {
          scope.render(angular.copy(newData));
        }, true);

        scope.render = function (data) {
          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {
            graph.selectAll('*').remove();

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
            graph.selectAll('.bar')
              .data(data)
              .enter().append('rect')
              .attr('class', function(d) { return d.drift > d.kpi ? 'bar' : 'bar solid' })
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
            var thresholds = data.map(function(d) { return d.kpi });
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
                return 'translate(' + (x(data.indexOf(d)) - 28) + ',' + (y(d.kpi) - 40) + ')';
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
              .text(function(d){ return format(d.kpi) });

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
