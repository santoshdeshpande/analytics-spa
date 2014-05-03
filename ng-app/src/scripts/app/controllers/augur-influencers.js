/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', 'Augur', 'Habitat', function ($scope) {
    $scope.data = { nodes: [] };
    
    $scope.augur.$promise.then(function(augur){
      $scope.data = { nodes: augur['learningReport']['featureImportance'] };
    });
  }];
});
