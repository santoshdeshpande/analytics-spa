/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', function ($scope) {
    $scope.charts = {};
    $scope.augur.$promise.then(function (augur) {
      $scope.charts = augur.learningReport;
    });
  }];
});
