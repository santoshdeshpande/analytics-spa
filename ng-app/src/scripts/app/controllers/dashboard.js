/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return ['$scope', '$q', 'Augur', 'DataSource', 'FactTable', 'Habitat', function ($scope, $q, Augur, DataSource, FactTable, Habitat) {
    $scope.artifacts = [];
    $scope.selectedArtifactTypes = { augur: true, habitat: true, factTable: true };
    $scope.artifactsQuery = '';

    $scope.data = [
      [0, 0.2892958817017044],
      [1, 0.9705644082535015],
      [2, 0.6097862345277262],
      [3, 0.8966801796251629],
      [4, 0.00019735550531585488],
      [5, 0.2470780754027736],
      [6, 0.7253772773508671],
      [7, 0.7278165663342049],
      [8, 0.6231532520527285],
      [9, 0.6993395531264461],
      [10, 0.5220973708243581],
      [11, 0.5824288436936865],
      [12, 0.9900381661155967],
      [13, 0.10729151217775779],
      [14, 0.3638878959880296],
      [15, 0.40645286501580546],
      [16, 0.4358252721341106],
      [17, 0.9085642535212296],
      [18, 0.27239086306996496],
      [19, 0.8039054748253558]
    ];

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
            factTable.habitat_id = habitat.code;
            factTable.colorScheme = habitat.colorScheme;
            $scope.artifacts.push(factTable);
          });
          angular.forEach(augurs[i], function(augur) {
            augur.type = 'augur';
            augur.habitat_id = habitat.code;
            augur.colorScheme = habitat.colorScheme;
            $scope.artifacts.push(augur);
          });
        }
      });
    });
  }]
});
