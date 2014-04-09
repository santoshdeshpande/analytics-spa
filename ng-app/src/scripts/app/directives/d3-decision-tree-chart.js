/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  function parentNodes(node, arr) {
    arr ? arr.push(node) : arr = [node];

    if (node.parent) {
      parentNodes(node.parent, arr)
    }

    return arr
  }

  function buildPath(nodes) {
    var pathElements = [];
    var newPathElement = {};
    var predicate, confidence = null;

    nodes.map(function (node) {
      if (node.children) {
        predicate = node.children[0].simplePredicate || node.children[0].simpleSetPredicate;
        newPathElement = { type: 'node', label: predicate.field };
      } else {
        confidence = node.scoreDistribution && +node.scoreDistribution[1].confidence;
        newPathElement = { type: 'leaf ' + ((confidence > 0.5) ? 'happy' : 'sad'), label: node.score };
      }

      if (node.simplePredicate) {
        newPathElement.operation = ((node.simplePredicate.operator == 'lessThan') ? '<' : '>=') + node.simplePredicate.value;
      }

      if (node.simpleSetPredicate) {
        newPathElement.operation = node.simpleSetPredicate.booleanOperator + '(' + node.simpleSetPredicate.array + ')'
      }

      pathElements.push(newPathElement);
    });

    return pathElements.reverse();
  }

  return ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        treePathElements: '='
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;

        var tooltip = d3.select(ele[0]).append('div')
            .attr('class', 'tree-tooltip')
            .style('background-color', 'rgba(0, 0, 0, 0.70)')
            .style('opacity', 0);

        // define dimensions of graph
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
          width = 700 - margin.left - margin.right,
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

              // Create the link lines.
              var paths = svg.selectAll(".link")
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
                    return 'node'
                  } else {
                    var confidence = d.scoreDistribution && +d.scoreDistribution[1].confidence;
                    return (confidence >  0.5) ? 'leaf happy' : 'leaf sad'
                  }
                })
                .attr("r", 12)
                .attr("cx", function (d) { return d.x })
                .attr("cy", function (d) { return d.y })
                .on('mouseover', function (d) {
                  var pNodes = parentNodes(d);
                  var tooltipHTML;
                  var tooltipFormatPercent = d3.format('%');

                  scope.$apply(function(){
                    scope.treePathElements = buildPath(pNodes);
                  });

                  nodes.map(function(node) {
                    node.highlight = false;
                  });

                  pNodes.map(function(node) {
                    node.highlight = true;
                  });

                  paths.attr('class', function(d) {
                    if (d.target.highlight && d.source.highlight) {
                      return 'link fat';
                    } else {
                      return 'link';
                    }
                  });

                  // tooltip
                  tooltipHTML = [
                      '<dl>',
                      '<dt>' + 'Class' + '</dt>', '<dd>' + d.score + '</dd>',
                      '<dt>' + 'Confidence 0' + '</dt>', '<dd>' + tooltipFormatPercent(d.scoreDistribution[0].confidence) + '</dd>',
                      '<dt>' + 'Confidence 1' + '</dt>', '<dd>' + tooltipFormatPercent(d.scoreDistribution[1].confidence) + '</dd>',
                      '<dt>' + 'Instances 0' + '</dt>', '<dd>' + d.scoreDistribution[0].recordCount + '</dd>',
                      '<dt>' + 'Instances 1' + '</dt>', '<dd>' + d.scoreDistribution[1].recordCount + '</dd>',
                      '</dl>',
                      '<div class="summary">',
                        '<span>' + d.recordCount + ' instances' + '</span>',
                        '<br/>',
                        '<span>' + tooltipFormatPercent(d.recordCount / pNodes.reverse()[0].recordCount) + ' of data' + '</span>',
                      '</div>'
                  ].join('');
                  tooltip.transition()
                    .duration(100)
                    .style('opacity', .9);
                  tooltip.html(tooltipHTML)
                    .style('left', (d.x + 50) + 'px')
                    .style('top', (d.y + 30) + 'px');
                })
                .on('mouseout', function (d) {
                  if (!d.stickyPath) {
                    scope.$apply(function () {
                      scope.treePathElements = [];
                    });
                  }

                  tooltip.transition()
                    .duration(100)
                    .style('opacity', 0)
                }).on('click', function (d) {
                    nodes.map(function(node){ node.stickyPath = false });
                    d.stickyPath = true
              });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
