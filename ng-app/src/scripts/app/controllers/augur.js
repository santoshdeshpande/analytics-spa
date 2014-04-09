/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$state', '$scope', '$stateParams', 'Augur', 'Habitat', function ($state, $scope, $stateParams, Augur, Habitat) {
    $scope.augur = Augur.get({ habitatId: $stateParams.habitatId, augurId: $stateParams.augurId });
    $scope.habitat = Habitat.get({ habitatId: $stateParams.habitatId });

    $scope.statePerformance = 'augur.performance.learning';
    $scope.trackCurrentState = function (currentChildState) {
      $scope.statePerformance = currentChildState;
    };
    $scope.activatePerformanceState = function () {
      $state.transitionTo($scope.statePerformance, { habitatId: $stateParams.habitatId, augurId: $stateParams.augurId });
    }
  }];
});
