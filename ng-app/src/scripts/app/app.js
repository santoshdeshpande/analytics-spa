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
        state('augur-new', {
          url: '/augurs/new',
          templateUrl: 'partials/augur-new.html',
          controller: 'AugurNewCtrl'
        }).
        state('augur', {
          url: '/habitat/:habitatId/augurs/:augurId',
          templateUrl: 'partials/augur.html',
          controller: 'AugurCtrl'
        }).
        state('augur.influencers', {
          url: '/influencers',
          templateUrl: 'partials/augur-influencers.html',
          controller: 'AugurInfluencersCtrl'
        }).
        state('augur.accuracy', {
          url: '/accuracy',
          templateUrl: 'partials/augur-accuracy.html',
          controller: 'AugurAccuracyCtrl'
        }).
        state('augur.accuracy-detail', {
          url: '/detail/:chartType',
          templateUrl: 'partials/augur-accuracy-detail.html',
          controller: 'AugurAccuracyDetailCtrl'
        }).
        state('augur.performance', {
          abstract: true,
          url: '/performance',
          template: '<ui-view/>'
        }).
        state('augur.performance.learning', {
          url: '/learning',
          templateUrl: 'partials/augur-performance-learning.html',
          controller: 'AugurPerformanceCtrl'
        }).
        state('augur.performance.evaluation', {
          url: '/evaluation',
          templateUrl: 'partials/augur-performance-evaluation.html',
          controller: 'AugurPerformanceCtrl'
        }).
        state('augur.tree', {
          url: '/tree',
          templateUrl: 'partials/augur-tree.html',
          controller: 'AugurTreeCtrl'
        }).
        state('augur.settings', {
          url: '/settings',
          templateUrl: 'partials/augur-settings.html',
          controller: 'AugurSettingsCtrl'
        })
    }]).run(['$rootScope', '$state', function ($rootScope, $state) {
      var root = angular.element(document.documentElement);

//      $rootScope.$on('$stateChangeSuccess', function(){
//        root.attr('data-theme', '');
//      });

      $rootScope.$on('theme', function(ev, theme){
        $rootScope.theme = theme;
        root.attr('data-theme', theme);

        $rootScope.$broadcast('themeChanged', theme);
      });
    }]);
});
