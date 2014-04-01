/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', 'Augur', 'Habitat', function ($scope, $stateParams, Augur, Habitat) {
    $scope.augur = Augur.get({ habitatId: $stateParams.habitatId, augurId: $stateParams.augurId });
    $scope.habitat = Habitat.get({ habitatId: $stateParams.habitatId });
  }];
});
