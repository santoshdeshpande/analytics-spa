/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  return [function () {
    var width  = 260, // default width
        height = 180; // default height

    function chart() {

    }

    chart.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
    };

    return chart;
  }]
});
