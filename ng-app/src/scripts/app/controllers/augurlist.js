/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return function ($scope, Augur) {
    $scope.augurs = Augur.query();
  }
});