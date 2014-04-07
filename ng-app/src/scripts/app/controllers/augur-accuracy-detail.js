/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.chartType = $stateParams.chartType;
  }];
});
