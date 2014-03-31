/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$routeParams', 'Augur', 'Habitat', function ($scope, $routeParams, Augur, Habitat) {
    $scope.augur = Augur.get({ habitatId: $routeParams.habitatId, augurId: $routeParams.augurId });
    $scope.habitat = Habitat.get({ habitatId: $routeParams.habitatId });
  }];
});
