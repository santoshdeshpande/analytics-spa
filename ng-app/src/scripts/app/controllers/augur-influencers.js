/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  var nodes = [
    { name: "delinquencies", value: 0.0786171428571429 },
    { name: "debtinc", value: 0.0658285714285714 },
    { name: "clage", value: 0.0587657142857143 },
    { name: "derogatories", value: 0.0221828571428571 },
    { name: "job", value: 0.02024 },
    { name: "inquiries", value: 0.0145028571428571 },
    { name: "loan", value: 0.0131085714285714 },
    { name: "clno", value: 0.0116571428571429 },
    { name: "yoj", value: 0.0108228571428571 },
    { name: "value", value: 0.00955428571428571 },
    { name: "mortgage", value: 0.00954285714285714 },
    { name: "reason", value: 0.00635428571428571 }
  ];

  return  ['$scope', '$stateParams', 'Augur', 'Habitat', function ($scope, $stateParams, Augur, Habitat) {
    $scope.data = { nodes: [] };

    Augur.get({ habitatId: $stateParams.habitatId, augurId: $stateParams.augurId }, function (augur) {
      if (augur.name[0] === 'a' || augur.name[0] === 'A') {
        angular.forEach(nodes, function (node) {
          $scope.data.nodes.push(node);
        });
      } else {
        angular.forEach(nodes, function (node) {
          $scope.data.nodes.push(node);
        });
        angular.forEach(nodes, function (node) {
          $scope.data.nodes.push(node);
        });
        angular.forEach(nodes, function (node) {
          $scope.data.nodes.push(node);
        });
        angular.forEach(nodes, function (node) {
          $scope.data.nodes.push(node);
        });
      }
    });
  }];
});
