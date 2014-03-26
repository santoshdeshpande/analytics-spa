/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$routeParams', 'Augur', function ($scope, $routeParams, Augur) {
    $scope.augur = Augur.get({augurId: $routeParams.augurId}, function (augur) {
      console.log('Got augur with id: ' + augur.id);
    });
  }];
});
