/* global
 define: false,
 console: false
 */
define([
  'angular',
  'directives/augur-settings',
  'directives/augur-scheduler',
  'directives/available-event',
  'directives/d3-bar-chart',
  'directives/d3-profile-bar-chart',
  'directives/d3-landscape-chart',
  'directives/d3-profile-diamond-chart',
  'directives/d3-decision-tree-chart',
  'directives/d3-influencer-chart',
  'directives/d3-line-chart',
  'directives/d3-line-chart-dashboard',
  'directives/d3-performance-chart',
  'directives/d3-pie-chart',
  'directives/d3-roc-chart',
  'directives/dropdown',
  'directives/unique-augur-name',
  'directives/threshold-in-range',
    'directives/util/drop_down_hover',
    'directives/util/dj-focus-on-select',
  'angular.spinner',
  'mm-foundation-tpls'
], function ( ng,
              AugurSettings,
              AugurScheduler,
              AvailableEvent,
              D3BarChart,
              D3ProfileBarChart,
              D3LandscapeChart,
              D3ProfileDiamondChart,
              D3DecisionTreeChart,
              D3InfluencerChart,
              D3LineChart,
              D3LineChartDashboard,
              D3PerformanceChart,
              D3PieChart,
              D3RocChart,
              Dropdown,
              UniqueAugurName,
              ThresholdInRange,
              DropDownHover,
              DJFocusOnSelect
            ) {
  'use strict';

  return ng.module('dejalyticsDirectives', ['angularSpinner', 'mm.foundation'])
    .directive('augurSettings', AugurSettings)
    .directive('augurScheduler', AugurScheduler)
    .directive('availableEvent', AvailableEvent)
    .directive('d3BarChart', D3BarChart)
    .directive('d3ProfileBarChart', D3ProfileBarChart)
    .directive('d3ProfileDiamondChart', D3ProfileDiamondChart)
    .directive('d3DecisionTreeChart', D3DecisionTreeChart)
    .directive('d3InfluencerChart', D3InfluencerChart)
    .directive('d3LineChart', D3LineChart)
    .directive('d3LineChartDashboard', D3LineChartDashboard)
    .directive('d3PerformanceChart', D3PerformanceChart)
    .directive('d3PieChart', D3PieChart)
    .directive('d3RocChart', D3RocChart)
    .directive('dropdown', Dropdown)
    .directive('uniqueAugurName', UniqueAugurName)
    .directive('thresholdInRange', ThresholdInRange)
    .directive('dropdownHover', DropDownHover)
    .directive('d3LandscapeChart', D3LandscapeChart)
    .directive('djFocusOnSelect', DJFocusOnSelect);
});
