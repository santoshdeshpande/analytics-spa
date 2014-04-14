/* global
 define: false,
 console: false
 */

define([
  '../constants'
], function (Constants) {
  'use strict';

  function directive() {
    return {
      restrict: 'E',
      templateUrl: 'partials/directives/augur-settings.html',
      transclude: true,
      replace: true,
      scope: {
        augur: '='
      },
      link: function (scope, ele, attrs) {
        scope.DAYS_IN_MONTH = Constants.DAYS_IN_MONTH;
        scope.KEY_PERFORMANCE_INDICATORS = Constants.KEY_PERFORMANCE_INDICATORS;
      }
    };
  }

  return directive;
});
