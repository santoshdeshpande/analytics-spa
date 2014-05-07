/* global
 define: false,
 console: false
 */
define([
  '../constants'
], function (Constants) {
  'use strict';

  return  ['$scope', '$stateParams', '$q', 'Augur', function ($scope, $stateParams, $q, Augur) {
    $scope.augurSettings = {};

    $q.all([
      $scope.augur.$promise,
      $scope.habitat.$promise
    ]).then(function () {
      $scope.initialize()
    });

    $scope.initialize = function () {
      $scope.augurSettings.evaluation = { schedule: $scope.augur.evaluationSchedule };
      $scope.augurSettings.prediction = { schedule: $scope.augur.predictionSchedule };
      $scope.augurSettings.learning = { threshold: $scope.augur.learningThreshold };

      angular.forEach(Constants.KEY_PERFORMANCE_INDICATORS, function (indicator) {
        if (indicator.key === $scope.augur.learningKpi) {
          $scope.augurSettings.learning.kpi = indicator
        }
      });
    };

    $scope.submit = function (augurNewSettings) {
      augurNewSettings = _.pick($scope.augur, ['id', 'habitatId']);
      augurNewSettings.learningKpi = $scope.augurSettings.learning.kpi.key;
      augurNewSettings.learningThreshold = $scope.augurSettings.learning.threshold;
      augurNewSettings.evaluationScheduleAttrs = $scope.augurSettings.evaluation.schedule;
      augurNewSettings.predictionScheduleAttrs = $scope.augurSettings.prediction.schedule;

      Augur.update({ habitatId: $scope.habitat.id, augurId: $scope.augur.id }, { augur: augurNewSettings },
        function () {
          $scope.error = null;
          $scope.success = 'The new settings for the Augur have been saved';
        }, function (httpResponse) {
          $scope.success = null;
          $scope.error = 'There was an error saving the new Augur: ' + httpResponse.data['error'];
        });
    }
  }];
});
