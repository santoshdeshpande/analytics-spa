/* global
 define: false,
 console: false
 */
define([
  'angular',
  'services',
  'controllers/classification/create',
  'controllers/clustering/create',
  'controllers/classification/augur',
  'controllers/classification/accuracy',
  'controllers/classification/accuracy-detail',
  'controllers/classification/influencers',
  'controllers/classification/performance',
  'controllers/classification/settings',
  'controllers/classification/tree',
  'controllers/clustering/profile',
  'controllers/clustering/landscape',
  'controllers/dashboard'
], function (ng, services, AugurNewCtrl, AugurNewClusteringCtrl, AugurCtrl, AugurAccuracyCtrl, AugurAccuracyDetailCtrl, AugurInfluencersCtrl, AugurPerformanceCtrl, AugurSettingsCtrl, AugurTreeCtrl, AugurProfileCtrl,AugurLandscapeCtrl, DashboardCtrl) {
  'use strict';

  return ng.module('MainControllers', [ services.name ])
      .controller('AugurCtrl', AugurCtrl)
      .controller('AugurNewCtrl', AugurNewCtrl)
      .controller('AugurNewClusteringCtrl', AugurNewClusteringCtrl)
      .controller('AugurAccuracyCtrl', AugurAccuracyCtrl)
      .controller('AugurAccuracyDetailCtrl', AugurAccuracyDetailCtrl)
      .controller('AugurInfluencersCtrl', AugurInfluencersCtrl)
      .controller('AugurPerformanceCtrl', AugurPerformanceCtrl)
      .controller('AugurSettingsCtrl', AugurSettingsCtrl)
      .controller('AugurTreeCtrl', AugurTreeCtrl)
      .controller('AugurProfileCtrl', AugurProfileCtrl)
      .controller('AugurLandscapeCtrl', AugurLandscapeCtrl)
      .controller('DashboardCtrl', DashboardCtrl);
});
