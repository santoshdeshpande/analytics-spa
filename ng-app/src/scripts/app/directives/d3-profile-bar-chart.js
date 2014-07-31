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
                var tooltip = d3.select(ele[0]).append('div')
                    .attr('class', 'tree-tooltip')
                    .style('background-color', 'rgba(0, 0, 0, 0.70)')
                    .style('opacity', 0);

                var svg = d3.select(ele[0])
                    .append("svg:svg")
                    .attr('class', 'bar-chart')
                    .attr('width', dimensions.width)
                    .attr('height', dimensions.height)
                    .append("svg:g")
                    .attr('transform', 'translate(' + dimensions.margins.bottom + ',' + (dimensions.height-dimensions.margins.bottom) + ')');


                var x = d3.scale.ordinal().rangeRoundBands([0, dimensions.width-dimensions.margins.left-dimensions.margins.right]);
                var y = d3.scale.linear().range([0, dimensions.height - dimensions.margins.top-dimensions.margins.bottom]);
                var z = d3.scale.category10();

                scope.$watch('data', function (data) {
                    if (data != null) scope.render(data);
                }, true);

                scope.render = function (data) {
                    svg.selectAll('*').remove();

                    if (!data) return;
                    if (renderTimeout) $timeout.cancel(renderTimeout);

                    renderTimeout = $timeout(function () {
                        var headers = [];
                        for (var k in data)
                            headers.push(k);
                        var datum = [data];
                        var stacked = d3.layout.stack()(headers.map(function(cause){
                            return datum.map(function(d){
                                return {x: 'C1', y: +d[cause], type: cause};
                            })
                        }));
                        x.domain(stacked[0].map(function(d){return d.x}));
                        y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);

                        var c = svg.selectAll("g.fact")
                            .data(stacked)
                            .enter()
                            .append('svg:g')
                            .attr('class', 'bar-fact')
                            .style("fill", function(d, i) { return z(i); })
                            .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });

                        var rect = c.selectAll("rect")
                            .data(Object)
                            .enter().append('svg:rect')
                            .attr('x', function(d) { return x(d.x)})
                            .attr('y', function(d) { return -y(d.y0) - y(d.y)})
                            .attr("height", function(d) { return y(d.y); })
                            .attr("width", x.rangeBand())
                            .on("mouseover", function(d, e){
                                var position = d3.mouse(this);
                                var tooltipHTML = ["<dl>"];
                                angular.forEach(headers, function(h) {
                                    tooltipHTML.push("<dt>" + h + ": </dt>" + "<dd>" + data[h] + "</dd>");
                                });
                                tooltipHTML.push("</dl>");
                                tooltipHTML = tooltipHTML.join(" ");
                                tooltip.transition()
                                    .duration(100)
                                    .style('opacity', .9);
                                tooltip.html(tooltipHTML)
                                    .style('left', (x(position[0])) + 'px')
                                    .style('top', (y(position[1])) + 'px');
                            })
                            .on("mouseout", function(d){
                                tooltip.transition()
                                    .duration(100)
                                    .style('opacity', 0)
                            });





                    }, 200); // renderTimeout
                };
            }
        };
    }]
});
