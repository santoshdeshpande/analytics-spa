/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return function ($scope, $q, $timeout, Augur, DataSource, FactTable, Habitat) {
    $scope.artifacts = [];

    (function() {
      $q.all([
          Augur.query().$promise,
          Habitat.query().$promise
        ]).then(function (results) {
        angular.forEach(results[1], function(habitat){
          $scope.artifacts.push(habitat);
        });

        angular.forEach(results[0], function(augur){
          $scope.artifacts.push(augur);
        });
      });
    })();
  }
});
