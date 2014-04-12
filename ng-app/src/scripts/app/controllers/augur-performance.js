/* global
 define: false,
 console: false
 */
define([
  '../constants'
], function (Constants) {
  'use strict';

  return  ['$state', '$scope', '$stateParams', '$q', '$timeout', 'Augur', 'Habitat', function ($state, $scope, $stateParams, $q, $timeout, Augur, Habitat) {
    $scope.trackCurrentState($state.current.name); // inherited from parent augur.js

    $scope.evaluation = {
      activeIndicator: { },
      data: {}
    };

    $scope.learning = {
      activeIndicator: { },
      data: {}
    };

    $scope.indicators = [
      Constants.KEY_PERFORMANCE_INDICATORS.slice(0, Constants.KEY_PERFORMANCE_INDICATORS.length/3),
      Constants.KEY_PERFORMANCE_INDICATORS.slice(Constants.KEY_PERFORMANCE_INDICATORS.length/3, 2 * Constants.KEY_PERFORMANCE_INDICATORS.length/3),
      Constants.KEY_PERFORMANCE_INDICATORS.slice(2 * Constants.KEY_PERFORMANCE_INDICATORS.length/3, Constants.KEY_PERFORMANCE_INDICATORS.length)
    ];

    $scope.$watch('learning.activeIndicator', function(value){
      $scope.learning.data = $scope.allData[value.key];
    });

    $scope.$watch('evaluation.activeIndicator', function(value){
      $scope.evaluation.data = $scope.allData[value.key];
    });

    randomData().then(function(data){
      $scope.allData = data;
      $scope.learning.activeIndicator   = { key: 'misclassification_rate', label: 'Misclassification Rate' };
      $scope.evaluation.activeIndicator = { key: 'false_positive_rate',    label: 'False Positive Rate'    };
    });

    function randomData() {
      var deferred = $q.defer();

      var data = {};
      var thresholds = [
          Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2,
          Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2
      ];
      var days = (Math.round(Math.random() * 15) + 15);

      angular.forEach(Constants.KEY_PERFORMANCE_INDICATORS, function ( indicator ) {
        var arr = [];

        for ( var i = 0; i < days; i++ ) {
          var dateOffset = (24 * 60 * 60 * 1000) * (days - i);
          var myDate = new Date();
          myDate.setTime(myDate.getTime() - dateOffset);

          arr.push({drift: Math.random() * 0.8 + 0.2, threshold: thresholds[Math.floor(i / 7)], date: myDate})
        }
        data[indicator.key] = arr;

        if ( Constants.KEY_PERFORMANCE_INDICATORS.indexOf(indicator) === Constants.KEY_PERFORMANCE_INDICATORS.length - 1 ) {
          deferred.resolve(data)
        }
      });

      return deferred.promise;
    }
  }];
});
