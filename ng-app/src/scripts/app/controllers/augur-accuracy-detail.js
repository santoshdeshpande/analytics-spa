/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', function ($scope, $stateParams) {
    console.log("AugurAccuracyDetail", $stateParams.chartType);

    $scope.chartType = $stateParams.chartType;

  }];
});
