/* global
 define: false,
 console: false
 */
define([
  'angular',
  'directives/available-prediction-target',
  'directives/unique-augur-name',
  'directives/threshold-in-range',
  'mm-foundation-tpls'
], function ( ng, AvailablePredictionTarget, UniqueAugurName, ThresholdInRange) {
  'use strict';

  return ng.module('dejalyticsDirectives', ['mm.foundation'])
    .directive('availablePredictionTarget', AvailablePredictionTarget)
    .directive('uniqueAugurName', UniqueAugurName)
    .directive('thresholdInRange', ThresholdInRange);
});
