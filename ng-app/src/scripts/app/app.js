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
          template: '<ui-view/>',
          abstract: true,
          controller: 'AugurCtrl'
      }).
        state('augur.classification', {
          url: '/classification',
          templateUrl: 'partials/augur.html',
          controller: 'AugurCtrl'
        }).
        state('augur.clustering', {
          abstract: true,
          url: '/clustering',
          template: '<ui-view/>',
          controller: 'AugurCtrl'
        }).
        state('augur.clustering.home', {
             url: '/profile',
              templateUrl: 'partials/augur-clustering.html'
          }).
          state('augur.clustering.landscape', {
             url: '/landscape',
              abstract: true,
              template: '<ui-view/>'
          }).
          state('augur.clustering.settings', {
             url: '/settings',
              abstract: true,
              template: '<ui-view/>'
          }).
        state('augur.classification.influencers', {
          url: '/influencers',
          templateUrl: 'partials/augur-influencers.html',
          controller: 'AugurInfluencersCtrl'
        }).
        state('augur.classification.accuracy', {
          url: '/accuracy',
          templateUrl: 'partials/augur-accuracy.html',
          controller: 'AugurAccuracyCtrl'
        }).
        state('augur.classification.accuracy-detail', {
          url: '/detail/:chartType',
          templateUrl: 'partials/augur-accuracy-detail.html',
          controller: 'AugurAccuracyDetailCtrl'
        }).
        state('augur.classification.performance', {
          abstract: true,
          url: '/performance',
          template: '<ui-view/>'
        }).
        state('augur.classification.performance.learning', {
          url: '/learning',
          templateUrl: 'partials/augur-performance-learning.html',
          controller: 'AugurPerformanceCtrl'
        }).
        state('augur.classification.performance.evaluation', {
          url: '/evaluation',
          templateUrl: 'partials/augur-performance-evaluation.html',
          controller: 'AugurPerformanceCtrl'
        }).
        state('augur.classification.home', {
          url: '/home',
          templateUrl: 'partials/augur-tree.html',
          controller: 'AugurTreeCtrl'
        }).
        state('augur.classification.settings', {
          url: '/settings',
          templateUrl: 'partials/augur-settings.html',
          controller: 'AugurSettingsCtrl'
        })
    }]).run(['$rootScope', '$state', function ($rootScope, $state) {
      var root = angular.element(document.documentElement);

      $rootScope.$on('theme', function(ev, theme){
        $rootScope.theme = theme;
        root.attr('data-theme', theme);

        $rootScope.$broadcast('themeChanged', theme);
      });
    }]);
});
