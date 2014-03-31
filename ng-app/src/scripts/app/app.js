/* global
 define: false,
 console: false
 */
define([
  'angular',
  'angular.route',
  'animations',
  'controllers',
  'directives',
  'filters',
  'services',
  'partials-tpls.min'
], function (ng, ngRoute, animations, controllers, directives, filters, services) {
  'use strict';

  return ng
    .module('dejalyticsApp', [
      'ngRoute',
      'dejalyticsPartials',
      animations.name,
      controllers.name,
      directives.name,
      filters.name,
      services.name
    ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'partials/dashboard.html',
          controller: 'DashboardCtrl'
        }).
        when('/augurs/new', {
          templateUrl: 'partials/augur-new.html',
          controller: 'AugurNewCtrl'
        }).
        when('/habitat/:habitatId/augurs/:augurId', {
          templateUrl: 'partials/augur-detail.html',
          controller: 'AugurDetailCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }])
    .run(function ($rootScope) {
      $rootScope.$on('$routeChangeSuccess', function (to, from) {
        console.log('route change', from, to);
      });

      // adds some basic utilities to the $rootScope for debugging purposes
      $rootScope.log = function (thing) {
        console.log(thing);
      };

      $rootScope.alert = function (thing) {
        alert(thing);
      };
    });
});
