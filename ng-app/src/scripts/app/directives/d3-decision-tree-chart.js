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
    var newOperation = {};
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
        newOperation = { type: 'operation', label: ((node.simplePredicate.operator == 'lessThan') ? '<' : '>=') + node.simplePredicate.value }
      }

      if (node.simpleSetPredicate) {
        newOperation = { type: 'operation', label: node.simpleSetPredicate.booleanOperator + '(' + node.simpleSetPredicate.array + ')' }
      }

      pathElements.push(newPathElement);
      pathElements.push(newOperation);
    });
    pathElements.pop();

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


//                  d3.select(this)
//                    .style({opacity:'0.1'});
                });

          }, 200); // renderTimeout
        };
      }
    };
  }]
});
