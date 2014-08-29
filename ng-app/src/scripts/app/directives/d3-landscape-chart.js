/* global
 define: false,
 console: false
 */
define([
  'd3js',
  './chart'
], function (d3) {
  'use strict';

  var colorCodes = function (element) {
    var $element = angular.element(element);
    return ['border-right-color', 'border-left-color', 'border-top-color', 'border-bottom-color',
      'background-color', 'outline-color'].
      map(function (colorElement) {
        return  $element.css(colorElement);
      });
  };


  return ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        bondStrength: '='
      },
      link: function (scope, ele) {
        var $element = ele[0];
        var baseStrokeColor = "#22313F";
        scope.$watch('data', function (newVal) {
          if (newVal) {
            scope.render(newVal);
          }
        }, false);

        scope.$watch('bondStrength', function(value){
          if(value) {
            var val = 256 - (+value);
            update(val);
          }
        }, false);

        var dimensions = {
          margins: { top: 10, right: 10, bottom: 10, left: 10 },
          width: $element.offsetWidth,
          height: $element.offsetHeight
        };

        var color = d3.scale.ordinal().range(colorCodes($element));

        $rootScope.$on('themeChanged', function () {
          color = d3.scale.ordinal().range(colorCodes($element));
        });

        var radius = d3.scale.sqrt().range([0, 2]);

        var tooltip = d3.select($element)
          .append('div')
          .attr('id', 'tooltip-' + new Date().getTime())
          .attr('class', 'tree-tooltip')
          .style('background-color', 'rgba(0, 0, 0, 0.70)')
          .style('position', 'absolute')
          .style('visibility', "hidden");


        var link = null;
        var update = function (value) {
          force.stop();
          scope.nodes = scope.originalNodes;
          scope.links = [];

          angular.forEach(scope.originalLinks, function (link) {
            link.source.linkCount = 0;
            link.target.linkCount = 0;
          });

          angular.forEach(scope.originalLinks, function (link) {
            if (link.bond >= value) {
              link.source.linkCount = 1;
              link.target.linkCount = 1;
              scope.links.push(link);
            }
          });
          doLayout();
        };


        var svg = d3.select($element)
          .append("svg:svg")
          .attr('class', 'landscape-chart-container')
          .attr('width', dimensions.width)
          .attr('height', dimensions.height)
          .append("svg:g")
          .attr('id', 'landscape-chart-container');


        var force = d3.layout.force()
          .size([dimensions.width, dimensions.height])
          .charge(-5000)
          .gravity(0.1)
          .friction(0.3)
          .linkDistance(function (d) {
            return radius(d.source.count) + radius(d.target.count) + 100;
          });

        var linkContainer = svg.append("g")
          .attr("class", "link-container");

        var buildLinksAndNodes = function (data) {
          var clusters = data.Clusters;
          var distances = data.Distances;
          scope.originalNodes = {};
          scope.originalLinks = [];
          angular.forEach(clusters, function (cluster) {
            scope.originalNodes[cluster.name] = cluster;
          });

          angular.forEach(distances, function (distance) {
            var src = distance[0];
            var dest = distance[1];
            var bond = distance[2];
            scope.originalLinks.push({source: scope.originalNodes[src], target: scope.originalNodes[dest], bond: bond});
          });

          scope.max = d3.max(scope.originalLinks, function (d) {
            return d.bond;
          });
        };

        var buildLinks = function () {
          var link = linkContainer.selectAll("line.link")
            .data(force.links());

          linkContainer.selectAll("line.link")
            .style("stroke-width", function (d) {
              var bond = Math.log(d.bond);
              if (bond === 0)
                bond = 0.5;
              return bond + "px";
            });


          link.enter().append("svg:line")
            .attr("class", "link")
            .style('opacity', 0)
            .style('stroke', baseStrokeColor)
            .style("stroke-width", function (d) {
              var bond = Math.log(d.bond);
              if (bond === 0)
                bond = 0.5;
              return bond + "px";
            })
            .transition()
            .duration(300)
            .style('opacity', 0.8);


          link.exit()
            .select('line')
            .transition()
            .duration(300)
            .style('opacity', 0);

          link.exit()
            .transition()
            .duration(300)
            .remove();

          return link;
        };

        var buildNodes = function (dataNodes) {
          var node = svg.selectAll("g.node")
            .data(dataNodes, function (d) {
              return d.name;
            }).call(force.drag);

          var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .call(force.drag);

          node.selectAll("circle")
            .attr("class", "circle")
            .attr("r", function (d) {
              return radius(d.count);
            })
            .style("fill", function (d, i) {
              return color(d.count);
            })
            .attr("stroke", function(d){
              return d3.rgb(color(d.count)).brighter();
            });

          nodeEnter.append("svg:circle")
            .attr("class", "circle")
            .attr('r', 0)
            .transition()
            .duration(300)
            .attr("r", function (d) {
              return radius(d.count);
            })
            .style("fill", function (d, i) {
              return color(d.count);
            })
            .attr("stroke", function(d){
              return d3.rgb(color(d.count)).brighter();
            });


          nodeEnter.on("mouseover", function (d) {
            var tooltipHtml = ['<dl>'];
            tooltipHtml.push("<dt>" + d.name + "</dt><dd>" + d.count + "</dd>");
            tooltipHtml.push("<dl>");
            tooltipHtml = tooltipHtml.join(' ');
            tooltip.html(tooltipHtml);
            tooltip.style("left", (d.px + 30) + "px");
            tooltip.style("top", (d.py + 10) + "px");
            tooltip.transition()
              .duration(100)
              .style('visibility', 'visible');

            var x = d3.select(this)
              .select("circle")
              .transition()
              .duration(500)
              .attr("r", function(n){
                return radius(n.count) * 1.25;
              });

            d3.selectAll("line.link")
              .transition()
              .duration(250)
              .style("stroke", function (l) {
                if (l.source == d || l.target == d)
                  return "#26A65B";
                return baseStrokeColor;
              });
          });
          nodeEnter.on("mouseout", function (d) {
            tooltip.transition()
              .duration(100)
              .style('visibility', 'hidden');
            d3.selectAll("line.link")
              .transition()
              .duration(250)
              .style("stroke", baseStrokeColor);

            var x = d3.select(this)
              .select("circle")
              .transition()
              .duration(250)
              .attr("r", function(n){
                return radius(d.count);
              });


          });


          nodeEnter.append("svg:text")
            .attr("class", "node-text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text(function (d) {
              return d.name;
            });

          node.exit()
            .select("text")
            .transition()
            .duration(250)
            .style('opacity', 0);

          node.exit()
            .select("circle")
            .transition()
            .duration(250)
            .attr('r', 0);


          node.exit()
            .transition()
            .duration(250)
            .remove();

          return node;
        };


        var doLayout = function () {
          force.stop();
          var dataNodes = d3.values(scope.nodes).filter(function (n) {
            return n.linkCount > 0;
          });
          force.nodes(dataNodes)
            .links(scope.links)
            .on("tick", tick);
          buildNodes(dataNodes);
          buildLinks();
          force.start();
        };


        function tick() {
          var link = linkContainer.selectAll("line.link");
          var node = svg.selectAll("g.node");
          node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
          link.attr("x1", function (d) {
            return d.source.x;
          })
            .attr("y1", function (d) {
              return d.source.y;
            })
            .attr("x2", function (d) {
              return d.target.x;
            })
            .attr("y2", function (d) {
              return d.target.y;
            });
        }

        scope.render = function (data) {
          buildLinksAndNodes(data);
          update(0);
        };

      }
    };
  }];
});
