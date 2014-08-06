/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  function nodeValues (nodes) {
    return nodes.map(function (node) { return node.importance; });
  }

  function colorScale(element) {
    return d3.scale.ordinal().range([
      element.css('border-top-color'),
      element.css('border-right-color'),
      element.css('border-bottom-color'),
      element.css('border-left-color')
    ]);
  }
  
  return ['$rootScope', '$timeout', function ($rootScope, $timeout) {
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

        var $element = angular.element( ele[0] );
        var color = colorScale($element);
        $rootScope.$on('themeChanged', function () {
          color = colorScale($element);
        });

        var format = d3.format('.0f');
        var fontSize = d3.scale.linear().range([60, 240]).nice();

        var radius = d3.scale.linear();

        var pack = d3.layout.pack()
            .value(function(d) { return d.importance; })
            .radius(radius)
            .padding(20)
            .sort(function(a, b) { return Math.log(a.importance * b.importance); })
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
            var dataNodes = data.nodes
              .sort(function (a, b) { return a.importance - b.importance; })
              .reverse()
              .slice(0, maxNodes - 1)
              .map(function (node) {
                if (node.feature.length > 10) {
                  node.line1 = node.feature.substr(0, Math.round(node.feature.length / 2));
                  node.line2 = node.feature.substr(Math.round(node.feature.length / 2), node.feature.length);
                  node.dy_line1 = '-.6em';
                  node.dy_line2 = '0.4em';
                  node.dy_value = '1.4em';
                } else {
                  node.line1 = node.feature;
                  node.dy_line1 = '-0.3em';
                  node.dy_line2 = '0em';
                  node.dy_value = '.7em';
                }
                return node;
              });

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
                 .data(nodes.filter(function(d) { return !!d.feature; }))
               .enter().append('g')
                 .attr('class', 'node')
                 .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
                 .style('font-size', function(d) { return fontSize(d.r/Math.log(Math.max(Math.min(d.feature.length, variableLengthMax), variableLengthMin))) + '%'; });

            nodeEnter.append('circle')
                .attr('r', function(d) { return d.r; })
                .style('fill', function(d, i) { return color(i % 3); });

            nodeEnter.append('text')
              .style('text-anchor', 'middle')
              .attr('dy', function(d) { return d.dy_line1; })
              .text(function(d) { return d.line1; });

            nodeEnter.append('text')
              .style('text-anchor', 'middle')
              .attr('dy', function(d) { return d.dy_line2; })
              .text(function(d) { return d.line2; });

            nodeEnter.append('text')
              .attr('dy', function(d) { return d.dy_value; })
              .style('text-anchor', 'middle')
              .text(function(d) { return format(d.value * 1000); });

          }, 200); // renderTimeout
        };
      }
    };
  }];
});
