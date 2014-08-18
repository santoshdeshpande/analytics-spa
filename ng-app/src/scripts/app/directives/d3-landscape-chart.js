/* global
 define: false,
 console: false
 */
define([
  'd3js',
  './chart'
], function (d3) {
  'use strict';

  return ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'partials/directives/landscape-chart.html',
      link: function (scope, ele) {
        var baseStrokeColor = "#22313F";
        scope.$watch('data', function (data) {
          if (data) {
            scope.render(data);
          }
        }, true);

        var dimensions = {
          margins: { top: 10, right: 10, bottom: 10, left: 10 },
          width: 800,
          height: 500
        };

        var colorCodes = function () {
          var $element = angular.element(ele[0]);
          return ['border-right-color', 'border-left-color', 'border-top-color', 'border-bottom-color',
            'background-color', 'outline-color'].
            map(function (colorElement) {
              return  $element.css(colorElement);
            });
        };

        var color = d3.scale.ordinal().range(colorCodes());

        $rootScope.$on('themeChanged', function () {
          var codes = colorCodes();
          color = d3.scale.ordinal().range(colorCodes());
        });

        var radius = d3.scale.sqrt().range([0, 2]);

        var tooltip = d3.select(ele[0])
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
          d3.select("#nRadius-value").text(value);
          doLayout();
        };


        var svg = d3.select(".chart-container")
          .append("svg:svg")
          .attr('class', 'landscape-chart-container')
          .attr('width', dimensions.width)
          .attr('height', dimensions.height)
          .append("svg:g")
          .attr('id', 'landscape-chart-container');


        var force = d3.layout.force()
          .size([dimensions.width, dimensions.height])
          .charge(-1500)
          .gravity(0.1)
          .friction(0.5)
          .linkDistance(function (d) {
            return radius(d.source.count) + radius(d.target.count) + 100;
          });

        var linkContainer = svg.append("g")
          .attr("class", "link-container");


        var min, max;

        var buildLinksAndNodes = function (data) {
          var clusters = data.Clusters;
          var distances = data.distances;
          scope.originalNodes = {};
          scope.originalLinks = [];
          angular.forEach(clusters, function (cluster) {
            scope.originalNodes[cluster.Name] = cluster;
          });

          angular.forEach(distances, function (distance) {
            var src = distance[0];
            var dest = distance[1];
            var bond = distance[2];
            scope.originalLinks.push({source: scope.originalNodes[src], target: scope.originalNodes[dest], bond: bond});
          });

          max = d3.max(scope.originalLinks, function (d) {
            return d.bond;
          });
          min = 0;
          d3.select(".slider")
            .attr("min", min)
            .attr("value", max)
            .attr("max", max)
            .on("input", function () {
              var val = this.max - this.value;
              d3.select("#slider-value").text(val);
              update(val);
            });

          d3.select("#steps").select("*").remove();
          angular.forEach(distances, function (distance) {
            var value = max - distance[2];
            d3.select("#steps")
              .append("option")
              .attr("value", value)
              .text(value);
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
            .duration(250)
            .remove();

          return link;
        };

        var buildNodes = function (dataNodes) {
          var node = svg.selectAll("g.node")
            .data(dataNodes, function (d) {
              return d.Name;
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
            });

          nodeEnter.on("mouseover", function (d) {
            var tooltipHtml = ['<dl>'];
            tooltipHtml.push("<dt>" + d.Name + "</dt><dd>" + d.count + "</dd>");
            tooltipHtml.push("<dl>");
            tooltipHtml = tooltipHtml.join(' ');
            tooltip.html(tooltipHtml);
            tooltip.style("left", (d.px + 30) + "px");
            tooltip.style("top", (d.py + 10) + "px");
            tooltip.transition()
              .duration(100)
              .style('visibility', 'visible');
            d3.selectAll("line.link")
              .transition()
              .duration(250)
              .style("stroke", function (l) {
                if (l.source == d || l.target == d)
                  return "#26A65B";
                return baseStrokeColor;
              });
          })
            .on("mouseout", function (d) {
              tooltip.transition()
                .duration(100)
                .style('visibility', 'hidden');
              d3.selectAll("line.link")
                .transition()
                .duration(250)
                .style("stroke", baseStrokeColor);

            });


          nodeEnter.append("svg:text")
            .attr("class", "node-text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text(function (d) {
              return d.Name;
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
