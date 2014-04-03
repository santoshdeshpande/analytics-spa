/* global
 define: false,
 console: false
 */
define([
  'angular',
  'directives/available-prediction-target',
  'directives/d3-line-chart',
  'directives/d3-pie-chart',
  'directives/unique-augur-name',
  'directives/threshold-in-range',
  'mm-foundation-tpls'
], function ( ng, AvailablePredictionTarget, D3LineChart, D3PieChart, UniqueAugurName, ThresholdInRange) {
  'use strict';

  return ng.module('dejalyticsDirectives', ['mm.foundation'])
    .directive('availablePredictionTarget', AvailablePredictionTarget)
    .directive('d3LineChart', D3LineChart)
    .directive('d3PieChart', D3PieChart)
    .directive('uniqueAugurName', UniqueAugurName)
    .directive('thresholdInRange', ThresholdInRange);
});
