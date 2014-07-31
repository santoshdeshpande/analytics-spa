/* global
 define: false,
 console: false
 */
define([
    'd3js',
    './chart'
], function (d3, Chart) {
    'use strict';

    return ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function (scope, ele, attrs) {
                var renderTimeout;
                var dimensions = {
                    margins: { top: 10, right: 10, bottom: 10, left: 10 },
                    width: 50,
                    height: 80
                };
                var id = "diamond-"+new Date().getTime();
                var svg = d3.select(ele[0])
                    .append("svg:svg")
                    .attr('class', 'bar-chart')
                    .attr('width', dimensions.width)
                    .attr('height', dimensions.height)
                    .append("svg:g")
                    .attr('transform', 'translate(' + dimensions.margins.bottom + ',' + (dimensions.height-dimensions.margins.bottom) + ')')
                    .attr('id', id);

                var tooltip = d3.select(ele[0])
                    .append('div')
                    .attr('id', 'tooltip-' + new Date().getTime())
                    .attr('class', 'tree-tooltip')
                    .style('background-color', 'rgba(0, 0, 0, 0.70)')
                    .style('position', 'absolute')
                    .style('visibility', "hidden");

                var w = dimensions.width-dimensions.margins.left-dimensions.margins.right;
                var x = d3.scale.linear().range([0, w ]);
                var y = d3.scale.linear().range([0, dimensions.height - dimensions.margins.top-dimensions.margins.bottom]);
                var z = d3.scale.category10();

                scope.$watch('data', function (data) {
                    if (data != null) scope.render(data);
                }, true);
                var bodyNode = d3.select('body').node();
                scope.render = function (data) {
                    svg.selectAll('*').remove();

                    if (!data) return;
                    if (renderTimeout) $timeout.cancel(renderTimeout);
                    var max = Math.ceil(data.max + 0.2 * data.max);
                    var min = 0; //Math.floor(data.min - 0.2 * data.min);
                    var xpos = w/2;
                    renderTimeout = $timeout(function () {
                        y.domain([min,max]);
                        x.domain([0, dimensions.width-dimensions.margins.left-dimensions.margins.right]);
                        var line = svg.append("line")
                            .attr("x1", x(xpos))
                            .attr("y1", -y(min))
                            .attr("x2", x(xpos))
                            .attr("y2", -y(max))
                            .style("stroke", "black");
                        var datum = [data.min, data.mean, data.max];

                        var circle = svg.selectAll("circle")
                            .data(datum)
                            .enter()
                            .append("svg:circle")
                            .attr("cx", xpos)
                            .attr("cy", function(d){return -y(d)})
                            .attr("r", 1)
                            .style("stroke", "black")

                        var yMean = y(data.mean);

                        svg.append("line")
                            .attr("x1", x(0))
                            .attr("y1", -yMean)
                            .attr("x2",x(w))
                            .attr("y2",-yMean)
                            .style("stroke", "black");

                        var paths = [[w/2, data.min], [0, data.mean], [w/2, data.max], [w, data.mean],[w/2, data.min]];
                        line = d3.svg.line()
                            .x(function(d){ return x(d[0])})
                            .y(function(d){return -y(d[1])});

                        var path = svg.append("path")
                            .attr("d", line(paths))
                            .attr("stroke", "blue")
                            .attr("fill", "lightblue");

                    }, 200); // renderTimeout
                };
            }
        };
    }]
});
