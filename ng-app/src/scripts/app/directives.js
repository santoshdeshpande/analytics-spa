/* global
 define: false,
 console: false
 */
define([
  'angular',
  'directives/available-prediction-target',
  'directives/d3-line-chart',
  'directives/d3-pie-chart',
  'directives/d3-roc-chart',
  'directives/unique-augur-name',
  'directives/threshold-in-range',
  'mm-foundation-tpls'
], function ( ng, AvailablePredictionTarget, D3LineChart, D3PieChart, D3RocChart, UniqueAugurName, ThresholdInRange) {
  'use strict';

  return ng.module('dejalyticsDirectives', ['mm.foundation'])
    .directive('availablePredictionTarget', AvailablePredictionTarget)
    .directive('d3LineChart', D3LineChart)
    .directive('d3PieChart', D3PieChart)
    .directive('d3RocChart', D3RocChart)
    .directive('uniqueAugurName', UniqueAugurName)
    .directive('thresholdInRange', ThresholdInRange);
});
