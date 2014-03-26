/* global
 define: false,
 console: false
 */
define([
  'lodash'
], function (_) {
  'use strict';

  return function (Augur) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        scope.augurs = [];

        Augur.query(function (augurs) {
          angular.forEach(augurs, function (augur) {
            this.push(augur.name);
          }, scope.augurs);
        });

        modelCtrl.$parsers.unshift(function(viewValue){
          if (scope.augurs.indexOf(viewValue) < 0) {
            modelCtrl.$setValidity('uniqueAugurName', true);
          } else {
            modelCtrl.$setValidity('uniqueAugurName', false);
          }
          return viewValue;
        });
      }
    };
  }
});
