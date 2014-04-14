/* global
 define: false,
 console: false
 */
define([
  'lodash',
  '../constants'
], function (_, Constants) {
  'use strict';

  return  ['$state', '$scope', 'Augur', 'FactTable', 'Habitat', function ($state, $scope, Augur, FactTable, Habitat) {
    $scope.KEY_PERFORMANCE_INDICATORS = Constants.KEY_PERFORMANCE_INDICATORS;

    $scope.habitats = [];
    $scope.factTables = [];

    $scope.unrecognizedPredictionTargetIds = [];
    $scope.predictionTargetIdsValidated = false;

    $scope.step = 1;

    $scope.stepValid = {
      one: false, two: false, three: false, four: false
    };

    $scope.augur = {
      name: '',
      habitat: '',
      factTable: {},
      predictionTargetIds: '',
      learning: {
        kpi: { }
      },
      evaluation: {
        schedule: {
          frequency: 'daily',
          timeOfDay: '02:00 AM',
          dayOfWeek: 'wednesday',
          dayOfMonth: 1
        }
      },
      prediction: {
        schedule: {
          frequency: 'daily',
          timeOfDay: '02:00 AM',
          dayOfWeek: 'wednesday',
          dayOfMonth: 1
        }
      }
    };

    Habitat.query(function(habitats){
      $scope.habitats = habitats;
    });

    // Maintain valid states for next button - begin

    var validateStepOne = function () {
      $scope.stepValid.one = false;

      if (($scope.habitats && $scope.habitats.indexOf($scope.augur.habitat) > -1) && (($scope.augur.name + "").length > 0)) {
        $scope.augur.habitatId = $scope.augur.habitat.id;

        FactTable.query({ habitatId: $scope.augur.habitatId }, function (factTables) {
          $scope.factTables = factTables;
        });

        $scope.stepValid.one = true;
      }
    };

    var validateStepTwo = function () {
      $scope.augur.predictionTargetIds = '';
      $scope.stepValid.three = false;

      if ($scope.factTables && ($scope.factTables.indexOf($scope.augur.factTable) > -1)) {
        $scope.augur.factTableId = $scope.augur.factTable.id;
        $scope.stepValid.two = true;
      } else {
        $scope.stepValid.two = false;
      }
    };

    function resetAugurByNewHabitat(){
      $scope.augur.factTable = {};
      $scope.augur.factTableId = undefined;
      $scope.augur.predictionTargetIds = '';

      $scope.stepValid.two   = false;
      $scope.stepValid.three = false;
    }

    $scope.$watch(function(){
      return $scope.augur.name;
    }, validateStepOne);

    $scope.$watch(function(){
      return $scope.augur.habitat;
    }, validateStepOne);

    $scope.$watch(function(){
      return $scope.augur.habitat;
    }, resetAugurByNewHabitat);

    $scope.$watch(function(){
      return $scope.augur.factTable;
    }, validateStepTwo);

    $scope.$watch(function(){
      return $scope.augur.predictionTargetIds;
    }, function() {
      $scope.predictionTargetIdsValidated = false;
      $scope.stepValid.three = false;
    });

    $scope.$watch(function(){
      return $scope.augur.learning.kpi.threshold;
    }, function(){
      var floatValue = Math.abs(+($scope.augur.learning.kpi.threshold+"".replace(/,/,'.')));

      if (($scope.augur.learning.kpi.threshold+"").length < 1 ||
          isNaN(floatValue) ||
          floatValue > $scope.augur.learning.kpi.max ||
          floatValue < $scope.augur.learning.kpi.min)
      {
        $scope.stepValid.four = false;
      } else {
        $scope.stepValid.four = true;
      }
    });

    // Maintain valid states for next button - end

    $scope.validatePredictionTargetIds = function() {
      $scope.$broadcast('validate:predictionTargetIds', $scope.augur.factTable.predictionTargetIds || [], function(isValid){
        $scope.stepValid.three = isValid;
      });
    };

    $scope.submit = function (augurNewAttributes) {
      augurNewAttributes = _.pick($scope.augur, ['name', 'factTableId']);
      augurNewAttributes.learningKpi = $scope.augur.learning.kpi.key;
      augurNewAttributes.learningThreshold = $scope.augur.learning.kpi.threshold;
      augurNewAttributes.predictionTargets = $scope.augur.learning.predictionTargetIds;
      augurNewAttributes.evaluationScheduleAttrs = $scope.augur.evaluation.schedule;
      augurNewAttributes.predictionScheduleAttrs = $scope.augur.prediction.schedule;

      Augur.save({ habitatId: $scope.augur.habitatId }, { augur: augurNewAttributes },
        function (augur, responseHeaders) {
          $state.transitionTo('augur.tree', { habitatId: $scope.augur.habitatId, augurId: augur.id });
        }, function (httpResponse) {
          alert("There was an error saving the new Augur - see console.log");
          console.log("There was an error saving the new Augur  ", httpResponse);
        });
    }
  }];
});
