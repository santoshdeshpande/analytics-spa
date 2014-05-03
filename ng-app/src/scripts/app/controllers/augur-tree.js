/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', function ($scope) {
    $scope.data = {};

    $scope.augur.$promise.then(function(augur){
      $scope.data = augur['learningReport']['tree']['data'];
    });
  }];
});
