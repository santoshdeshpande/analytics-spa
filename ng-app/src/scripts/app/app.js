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
            services.name,
            'mm.foundation'
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
                    templateUrl: 'partials/classification/create.html',
                    controller: 'AugurNewCtrl'
                }).
                state('augur-clustering-new', {
                    url: '/augurs/clustering/new',
                    templateUrl: 'partials/clustering/create.html',
                    controller: 'AugurNewClusteringCtrl'
                }).
                state('augur', {
                    url: '/habitat/:habitatId/augurs/:augurId',
                    template: '<ui-view/>',
                    abstract: true,
                    controller: 'AugurCtrl'
                }).
                state('augur.classification', {
                    url: '/classification',
                    templateUrl: 'partials/classification/index.html',
                    controller: 'AugurCtrl'
                }).
                state('augur.clustering', {
                    url: '/clustering',
                    abstract: true,
                    templateUrl: 'partials/clustering/index.html',
                    controller: 'AugurCtrl'
                }).
                state('augur.clustering.home', {
                    url: '/profile',
                    templateUrl: 'partials/clustering/profile.html',
                    controller: 'AugurProfileCtrl'
                }).
                state('augur.clustering.landscape', {
                    url: '/landscape',
                    templateUrl: 'partials/clustering/landscape.html'
                }).
                state('augur.clustering.settings', {
                    url: '/settings',
                    templateUrl: 'partials/clustering/settings.html'
                }).
                state('augur.classification.influencers', {
                    url: '/influencers',
                    templateUrl: 'partials/classification/influencers.html',
                    controller: 'AugurInfluencersCtrl'
                }).
                state('augur.classification.accuracy', {
                    url: '/accuracy',
                    templateUrl: 'partials/classification/accuracy.html',
                    controller: 'AugurAccuracyCtrl'
                }).
                state('augur.classification.accuracy-detail', {
                    url: '/detail/:chartType',
                    templateUrl: 'partials/classification/accuracy-detail.html',
                    controller: 'AugurAccuracyDetailCtrl'
                }).
                state('augur.classification.performance', {
                    abstract: true,
                    url: '/performance',
                    template: '<ui-view/>'
                }).
                state('augur.classification.performance.learning', {
                    url: '/learning',
                    templateUrl: 'partials/classification/performance-learning.html',
                    controller: 'AugurPerformanceCtrl'
                }).
                state('augur.classification.performance.evaluation', {
                    url: '/evaluation',
                    templateUrl: 'partials/classification/performance-evaluation.html',
                    controller: 'AugurPerformanceCtrl'
                }).
                state('augur.classification.home', {
                    url: '/home',
                    templateUrl: 'partials/classification/tree.html',
                    controller: 'AugurTreeCtrl'
                }).
                state('augur.classification.settings', {
                    url: '/settings',
                    templateUrl: 'partials/classification/settings.html',
                    controller: 'AugurSettingsCtrl'
                });
        }]).run(['$rootScope', '$state', function ($rootScope, $state) {
            var root = angular.element(document.documentElement);

            $rootScope.$on('theme', function (ev, theme) {
                $rootScope.theme = theme;
                root.attr('data-theme', theme);

                $rootScope.$broadcast('themeChanged', theme);
            });
        }]);
});
