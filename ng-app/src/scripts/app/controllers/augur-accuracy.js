/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', 'Augur', 'Habitat', function ($scope, $stateParams, Augur, Habitat) {

    function randomData() {
      var data = [];

      for(var i=0; i < 30; i++) {
        data.push(Math.floor( Math.random()* 10))
      }

      return data;
    }

    $scope.data = {
      lift                             : randomData(),
      response                         : randomData(),
      cumulativeResponse               : randomData(),
      capturedResponse                 : randomData(),
      cumulativeCapturedResponse       : randomData(),
      rocChart                         : randomData(),
      classificationMatrix             : randomData(),
      modelPosteriorProbabilities      : randomData(),
      bayesCorrectedPriorProbabilities : randomData()
    }

  }];
});
