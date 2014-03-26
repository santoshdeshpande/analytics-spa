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
  'services'
], function (ng, ngRoute, animations, controllers, directives, filters, services) {
  'use strict';

  return ng
      .module('dejalyticsApp', [
        'ngRoute',
        animations.name,
        controllers.name,
        directives.name,
        filters.name,
        services.name
      ])
      .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/augurs', {
              templateUrl: 'partials/augur-list.html',
              controller: 'AugurListCtrl'
            }).
            when('/augurs/new', {
              templateUrl: 'partials/augur-new.html',
              controller: 'AugurNewCtrl'
            }).
            when('/augurs/:augurId', {
              templateUrl: 'partials/augur-detail.html',
              controller: 'AugurDetailCtrl'
            }).
            when('/', {
              templateUrl: 'partials/dashboard.html',
              controller: 'DashboardCtrl'
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
