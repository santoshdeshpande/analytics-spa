/* global
 define: false,
 console: false
 */
define(['d3js'], function (d3) {
  'use strict';

  return  ['$scope', '$stateParams', '$timeout', function ($scope, $stateParams, $timeout) {
    $scope.data = {};
    $scope.minSliderValue = 0;
    $scope.maxSliderValue = 0;

    $scope.augur.$promise.then(function (augur) {

      $scope.clusters = augur.clustering.clusterProfile;

      $scope.minSliderValue = 0;
      $scope.maxSliderValue = d3.max($scope.clusters.distances, function(d){
        return d[2];
      });
      $timeout(function(){
        $scope.data.bondStrength = $scope.maxSliderValue;
      }, 100);


    });
  }];
});
