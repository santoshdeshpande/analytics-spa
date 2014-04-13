/* global
 define: false,
 console: false
 */

define([
  './controllers/dropdown-controller'
], function (controller) {
  'use strict';

  function directive() {
    return {
      restrict: 'E',
      templateUrl: '/partials/directives/dropdown.html',
      controller: controller,
      transclude: true,
      replace: true,
      scope: true
    };
  }

  return directive;
});


