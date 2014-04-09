/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$state', '$scope', '$stateParams', 'Augur', 'Habitat', function ($state, $scope, $stateParams, Augur, Habitat) {
    $scope.trackCurrentState($state.current.name); // inherited from parent augur.js
  }];
});
