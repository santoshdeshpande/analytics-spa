/* global
 define: false,
 console: false
 */

define([
  'angular',
  'spinjs'
], function ( angular, Spinner ) {
  'use strict';

  angular.module('angularSpinner', [])

    .factory('SpinnerService', ['$rootScope', function ($rootScope) {
      var config = {};

      config.spin = function (key) {
        $rootScope.$broadcast('spinner:spin', key);
      };

      config.stop = function (key) {
        $rootScope.$broadcast('spinner:stop', key);
      };

      return config;
    }])

    .directive('spinner', [function () {
      return {
        scope: true,
        link: function (scope, element, attr) {
          scope.spinner = null;

          scope.key = angular.isDefined(attr.spinnerKey) ? attr.spinnerKey : false;

          scope.startActive = angular.isDefined(attr.spinnerStartActive) ?
            attr.spinnerStartActive : scope.key ?
            false : true;

          scope.spin = function () {
            if (scope.spinner) {
              scope.spinner.spin(element[0]);
            }
          };

          scope.stop = function () {
            if (scope.spinner) {
              scope.spinner.stop();
            }
          };

          scope.$watch(attr.spinner, function (options) {
            scope.stop();

            scope.spinner = new Spinner(options);
            if (!scope.key || scope.startActive) {
              scope.spinner.spin(element[0]);
            }
          }, true);

          scope.$on('spinner:spin', function (event, key) {
            if (key === scope.key) {
              scope.spin();
            }
          });

          scope.$on('spinner:stop', function (event, key) {
            if (key === scope.key) {
              scope.stop();
            }
          });

          scope.$on('$destroy', function () {
            scope.stop();
            scope.spinner = null;
          });
        }
      };
    }]);
});

