/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', function ($scope) {
    $scope.data = {};

    $scope.augur.$promise.then(function(augur){
      var tree = augur.learningReport.tree;
      if (tree) $scope.data = tree.data;
    });
  }];
});
