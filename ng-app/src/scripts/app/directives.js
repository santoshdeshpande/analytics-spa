/* global
 define: false,
 console: false
 */
define([
  'angular',
  'directives/available-prediction-target',
  'directives/d3-bar-chart',
  'directives/d3-decision-tree-chart',
  'directives/d3-influencer-chart',
  'directives/d3-line-chart',
  'directives/d3-performance-chart',
  'directives/d3-pie-chart',
  'directives/d3-roc-chart',
  'directives/dropdown',
  'directives/unique-augur-name',
  'directives/threshold-in-range',
  'mm-foundation-tpls'
], function ( ng,
              AvailablePredictionTarget,
              D3BarChart,
              D3DecisionTreeChart,
              D3InfluencerChart,
              D3LineChart,
              D3PerformanceChart,
              D3PieChart,
              D3RocChart,
              Dropdown,
              UniqueAugurName,
              ThresholdInRange) {
  'use strict';

  return ng.module('dejalyticsDirectives', ['mm.foundation'])
    .directive('availablePredictionTarget', AvailablePredictionTarget)
    .directive('d3BarChart', D3BarChart)
    .directive('d3DecisionTreeChart', D3DecisionTreeChart)
    .directive('d3InfluencerChart', D3InfluencerChart)
    .directive('d3LineChart', D3LineChart)
    .directive('d3PerformanceChart', D3PerformanceChart)
    .directive('d3PieChart', D3PieChart)
    .directive('d3RocChart', D3RocChart)
    .directive('dropdown', Dropdown)
    .directive('uniqueAugurName', UniqueAugurName)
    .directive('thresholdInRange', ThresholdInRange);
});
