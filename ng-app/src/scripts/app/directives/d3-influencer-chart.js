/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  function nodeValues (nodes) {
    return nodes.map(function (node) { return node.importance })
  }
  
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
        var  width = 800,
          height = 600;

        var maxNodes = 40,
            radiusMin = 20,
            radiusMax = d3.scale.linear().domain([3, maxNodes]).range([140, 60]).nice(),
            variableLengthMin = 3,
            variableLengthMax = 12;

        var color = d3.scale.category10();
        var format = d3.format('.2%');
        var fontSize = d3.scale.linear().range([60, 240]).nice();

        var radius = d3.scale.linear();

        var pack = d3.layout.pack()
            .value(function(d) { return d.importance })
            .radius(radius)
            .padding(20)
            .sort(function(a, b) { return Math.log(a.importance * b.importance) })
            .size([width + 120, height]);

        var svg = d3.select(ele[0]).append('svg')
            .attr('width', width)
            .attr('height', height);

        scope.$watch('data', function (newData) {
          scope.render(angular.copy(newData));
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            var dataNodes = data.nodes.sort(function(a, b) { return a.importance - b.importance}).reverse().slice(0, maxNodes - 1);

            var rMax = radiusMax(dataNodes.length);

            fontSize.domain([
              Math.round(radiusMin / Math.log(variableLengthMax)),
              Math.round(rMax / Math.log(variableLengthMin))
            ]);

            radius
              .domain([
                d3.min(nodeValues(dataNodes)),
                d3.max(nodeValues(dataNodes))
              ])
              .range([radiusMin, rMax]);

            var nodes = pack.nodes({
              importance: 0,
              children: dataNodes
            });
            
            var nodeEnter = svg.selectAll('.node')
                 .data(nodes.filter(function(d) { return !!d.feature }))
               .enter().append('g')
                 .attr('class', 'node')
                 .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
                 .style('font-size', function(d) { return fontSize(d.r/Math.log(Math.max(Math.min(d.feature.length, variableLengthMax), variableLengthMin))) + '%' });

            nodeEnter.append('circle')
                .attr('r', function(d) { return d.r; })
                .style('fill', function(d, i) { return color(i % 3); });

            nodeEnter.append('text')
              .style('text-anchor', 'middle')
              .attr('dy', '-.2em')
              .text(function(d) { return d.feature });

            nodeEnter.append('text')
              .attr('dy', '.8em')
              .style('text-anchor', 'middle')
              .text(function(d) { return format(d.value) });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
