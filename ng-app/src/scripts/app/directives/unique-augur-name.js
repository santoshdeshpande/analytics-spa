/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return ['Augur', 'Habitat', function (Augur, Habitat) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        scope.augurs = [];

        Habitat.query(function(habitats){
          angular.forEach(habitats, function(habitat){
            Augur.query({ habitatId: habitat.id }, function (augurs) {
              angular.forEach(augurs, function (augur) {
                this.push(augur.name);
              }, scope.augurs);
            });
          });
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
  }];
});
