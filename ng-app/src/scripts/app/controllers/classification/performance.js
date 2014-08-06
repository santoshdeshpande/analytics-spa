/* global
 define: false,
 console: false
 */
define([
  '../../constants'
], function (Constants) {
  'use strict';

  function camelize(str) {
    if(!str) return;

    var camelized =  str.replace(/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? c.toUpperCase() : '';
    });

    return camelized.charAt(0).toLowerCase() + camelized.slice(1); // special camelization (first one is lower)
  }

  return  ['$state', '$scope', '$stateParams', '$q', '$timeout', 'Augur', 'Habitat', function ($state, $scope, $stateParams, $q, $timeout, Augur, Habitat) {
    $scope.trackCurrentState($state.current.name); // inherited from parent augur.js

    $scope.evaluation = {
      allData: {},
      activeIndicator: { },
      data: {},
      driftComparator: null
    };

    $scope.learning = {
      allData: {},
      activeIndicator: { },
      data: {}
    };

    $scope.indicators = [
      Constants.KEY_PERFORMANCE_INDICATORS.slice(0, Constants.KEY_PERFORMANCE_INDICATORS.length/3),
      Constants.KEY_PERFORMANCE_INDICATORS.slice(Constants.KEY_PERFORMANCE_INDICATORS.length/3, 2 * Constants.KEY_PERFORMANCE_INDICATORS.length/3),
      Constants.KEY_PERFORMANCE_INDICATORS.slice(2 * Constants.KEY_PERFORMANCE_INDICATORS.length/3, Constants.KEY_PERFORMANCE_INDICATORS.length)
    ];

    $scope.$watch('learning.activeIndicator', function(value){
      $scope.learning.data = $scope.learning.allData[camelize(value.key)];
    });

    $scope.$watch('evaluation.activeIndicator', function(value){
      $scope.evaluation.data = $scope.evaluation.allData[camelize(value.key)];
      $scope.evaluation.driftComparator = value.key && Constants.KEY_PERFORMANCE_INDICATORS_HASH_FULL[value.key]['comparator'];
    });

    $scope.augur.$promise.then(function(augur){
      $scope.learning.allData = augur['learningReport']['performanceDrift'];
      $scope.evaluation.allData = augur['evaluationReport']['performanceDrift'];

      $scope.learning.activeIndicator   = { key: augur.learningKpi, label: Constants.KEY_PERFORMANCE_INDICATORS_HASH[augur.learningKpi] };
      $scope.evaluation.activeIndicator = { key: augur.learningKpi, label: Constants.KEY_PERFORMANCE_INDICATORS_HASH[augur.learningKpi] };
    });

  }];
});
