/* global
 define: false,
 console: false
 */
define([
  '../constants'
], function (Constants) {
  'use strict';

  function randomDashboardChartData () {
    var arr = [];

    for (var i=0; i< 30; i++) {
      arr.push([i, Math.random()])
    }

    return arr;
  }

  function AugurStatusPoller(Augur, $interval, augur) {
    var timeoutId = $interval(function () {
      Augur.status({
        habitatId: augur.habitatId,
        augurId: augur.id
      }, function (updatedAugur) {
        if (updatedAugur.learningStatus === 'complete') {
          augur.learningStatus = 'complete';
          $interval.cancel(timeoutId);
        }
      });

    }, 1000 * 10, 60);

    this.cancel = function () {
      $interval.cancel(timeoutId);
    }
  }

  function controller ($scope, $stateParams, $timeout, $interval, $q, Augur, DataSource, FactTable, FlashMessages, Habitat) {
    $scope.artifacts = [];
    $scope.selectedArtifactTypes = { augur: true, habitat: true, factTable: true };
    $scope.artifactsQuery = '';

    $scope.pendingAgurus = [];
    $scope.$on('$destroy', function() {
      angular.forEach($scope.pendingAgurus, function ( pendingAugur ) {
        pendingAugur.cancel()
      })
    });

    $scope.flash = FlashMessages.getMessage();
    $timeout(function () {
      $scope.flash = '';
    }, 1500);

    $scope.artifactsFilter = function (artifact) {
      var queryMatch = true;
      if ($scope.artifactsQuery.length > 0) {
        queryMatch = artifact.name.toLowerCase().indexOf($scope.artifactsQuery.toLowerCase()) > -1;
      }
      return $scope.selectedArtifactTypes[artifact.type] && queryMatch;
    };

    Habitat.query(function (habitats) {
      $q.all([
          $q.all(habitats.map(function(habitat){return FactTable.query({ habitatId: habitat.id }).$promise})),
          $q.all(habitats.map(function(habitat){return Augur.query({ habitatId: habitat.id }).$promise}))
        ]).then(function (results) {
        var factTables = results[0],
            augurs = results[1];

        for (var i=0; i < habitats.length; i++) {
          var habitat = habitats[i];

          habitat.type = 'habitat';
          habitat.augurCount = augurs[i].length;
          $scope.artifacts.push(habitat);

          angular.forEach(factTables[i], function(factTable) {
            factTable.type = 'factTable';
            factTable.habitatId = habitat.code;
            factTable.colorScheme = habitat.colorScheme;
            $scope.artifacts.push(factTable);
          });
          angular.forEach(augurs[i], function(augur) {
            augur.type = 'augur';
            augur.habitatId = habitat.code;
            augur.colorScheme = habitat.colorScheme;
            if (!augur.augurType) {
              augur.augurType = 'classification';
            }

            augur.learningKpiLabel =
              Constants.KEY_PERFORMANCE_INDICATORS_HASH[augur.learningKpi]
              + ' (' + parseFloat(augur.learningThreshold).toFixed(2) + ')';

            if (!augur.dashboardChartData)
              augur.dashboardChartData = randomDashboardChartData();

            if (augur.learningStatus === 'pending')
              $scope.pendingAgurus.push(new AugurStatusPoller( Augur, $interval, augur ));

            $scope.artifacts.push(augur);
          });
        }
      });
    });
  }

  return ['$scope', '$stateParams', '$timeout', '$interval', '$q', 'Augur', 'DataSource', 'FactTable', 'FlashMessages', 'Habitat', controller];
});
