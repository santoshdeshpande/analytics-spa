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

        // define dimensions of graph
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
          width = 900 - margin.left - margin.right,
          height = 700 - margin.top - margin.bottom;

        var tree = d3.layout.tree().size([width, height]);

        var svg = d3.select(ele[0]).append('svg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        scope.$watch('data', function (newData) {
          scope.render(angular.copy(newData.root));
        }, true);

        scope.render = function (root) {

          if (!root) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {

              var nodes = tree.nodes(root),
                  links = tree.links(nodes);

              window.d3 = d3;

              // Create the link lines.
              svg.selectAll(".link")
                .data(links)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", d3.svg.diagonal().projection(function (d) {
                  return [d.x, d.y];
                }));

              // Create the node circles.
              svg.selectAll(".node")
                .data(nodes)
                .enter().append("circle")
                .attr("class", function(d) {
                  if (d.children && d.children.length > 0) {
                    console.log("has children", d);
                    return 'node';
                  } else {
                    var confidence = d.scoreDistribution && +d.scoreDistribution[1].confidence;
                    console.log("has no children", d, confidence);

                    if (confidence >  0.5)
                      return 'leaf happy';
                    else
                      return 'leaf sad';
                  }
                })
                .attr("r", 12)
                .attr("cx", function(d) { return d.x })
                .attr("cy", function(d) { return d.y });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
