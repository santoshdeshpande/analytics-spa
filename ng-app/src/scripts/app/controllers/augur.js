/* global
 define: false,
 console: false
 */
define([
  'angular',
  '../constants'
], function (ng, Constants) {
  'use strict';

  function controller($state, $scope, $stateParams, $rootScope, Augur, Habitat) {
    $scope.statePerformance = 'augur.performance.learning'; // start state for first visit

    $scope.augur = Augur.get({
      habitatId: $stateParams.habitatId,
      augurId: $stateParams.augurId
    });

    $scope.augur.$promise.then(function (augur) {
      augur.learningKpiLabel = Constants.KEY_PERFORMANCE_INDICATORS_HASH[augur.learningKpi] + ' (' + parseFloat(augur.learningThreshold).toFixed(2) + ')'
    });


    $scope.habitat = Habitat.get({
      habitatId: $stateParams.habitatId
    })
      .$promise
        .then( function ( habitat ) {
          if ( habitat.colorScheme ) {
            $rootScope.$broadcast( 'theme', habitat.colorScheme );
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

    $scope.trackCurrentState = trackCurrentState;
    $scope.activatePerformanceState = activatePerformanceState;
  }

  return  ['$state', '$scope', '$stateParams', '$rootScope', 'Augur', 'Habitat', controller];
});
