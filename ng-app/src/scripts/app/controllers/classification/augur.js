/* global
 define: false,
 console: false
 */
define([
  'angular',
  '../../constants'
], function (ng, Constants) {
  'use strict';

  function controller($state, $scope, $stateParams, $rootScope, Augur, Habitat) {
    $scope.statePerformance = 'augur.classification.performance.learning'; // start state for first visit

    $scope.augur = Augur.get({
      habitatId: $stateParams.habitatId,
      augurId: $stateParams.augurId
    });

    $scope.augur.$promise.then(function (augur) {
      augur.learningKpiLabel = Constants.KEY_PERFORMANCE_INDICATORS_HASH[augur.learningKpi];
      augur.learningThresholdLabel = '(' + parseFloat(augur.learningThreshold).toFixed(2) + ')';
    });


    $scope.habitat = Habitat.get({
      habitatId: $stateParams.habitatId
    });

    $scope.habitat.$promise.then(function ( habitat ) {
        if (habitat.colorScheme) {
          $rootScope.$broadcast('theme', habitat.colorScheme);
        }
      });

    function trackCurrentState(currentChildState) {
      $scope.statePerformance = currentChildState;
    }

    function activatePerformanceState() {
      $state.go($scope.statePerformance, {
        habitatId: $stateParams.habitatId,
        augurId: $stateParams.augurId
      });
    }

    function schedulePrediction() {
      Augur.schedule({
        habitatId: $scope.habitat.id,
        id: $scope.augur.id
      }, function ( prediction ) {
        $scope.augur.prediction.nextTimestamp = prediction.nextTimestamp;
      });
    }

    $scope.trackCurrentState = trackCurrentState;
    $scope.activatePerformanceState = activatePerformanceState;
    $scope.schedulePrediction = schedulePrediction;
  }

  return  ['$state', '$scope', '$stateParams', '$rootScope', 'Augur', 'Habitat', controller];
});
