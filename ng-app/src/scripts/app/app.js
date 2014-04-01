/* global
 define: false,
 console: false
 */
define([
  'angular',
  'animations',
  'controllers',
  'directives',
  'filters',
  'services',
  'angular.ui.router',
  'partials-tpls.min'
], function (ng, animations, controllers, directives, filters, services) {
  'use strict';

  return ng
    .module('dejalyticsApp', [
      'ui.router',
      'dejalyticsPartials',
      animations.name,
      controllers.name,
      directives.name,
      filters.name,
      services.name
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/dashboard');

      $stateProvider.
        state('dashboard', {
          url: '/dashboard',
          templateUrl: 'partials/dashboard.html',
          controller: 'DashboardCtrl'
        }).
        state('augur', {
          abstract: true,
          template: '<ui-view/>'
        }).
        state('augur.new', {
          url: '/augurs/new',
          templateUrl: 'partials/augur-new.html',
          controller: 'AugurNewCtrl'
        }).
        state('augur.detail', {
          url: '/habitat/:habitatId/augurs/:augurId',
          templateUrl: 'partials/augur-detail.html',
          controller: 'AugurDetailCtrl'
        });
    }]);
});
