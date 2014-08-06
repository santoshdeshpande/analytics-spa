/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.unshift(function(viewValue){
          var floatValue = Math.abs(+(viewValue+"".replace(/,/,'.')));
          var max = Math.abs(+(attrs.max+"".replace(/,/,'.')));
          var min = Math.abs(+(attrs.min+"".replace(/,/,'.')));

          if (isNaN(floatValue) || floatValue > max || floatValue < min) {
            modelCtrl.$setValidity('thresholdInRange', false);
          } else {
            modelCtrl.$setValidity('thresholdInRange', true);
          }
          return viewValue;
        });
      }
    };
  };
});
