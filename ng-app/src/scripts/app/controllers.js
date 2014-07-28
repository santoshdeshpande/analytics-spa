/* global
 define: false,
 console: false
 */
define([
  'angular',
  'services',
  'controllers/augur-new',
  'controllers/augur',
  'controllers/augur-accuracy',
  'controllers/augur-accuracy-detail',
  'controllers/augur-influencers',
  'controllers/augur-performance',
  'controllers/augur-settings',
  'controllers/augur-tree',
  'controllers/augur-profile',
  'controllers/dashboard'
], function (ng, services, AugurNewCtrl, AugurCtrl, AugurAccuracyCtrl, AugurAccuracyDetailCtrl, AugurInfluencersCtrl, AugurPerformanceCtrl, AugurSettingsCtrl, AugurTreeCtrl, AugurProfileCtrl, DashboardCtrl) {
  'use strict';

  return ng.module('MainControllers', [ services.name ])
      .controller('AugurCtrl', AugurCtrl)
      .controller('AugurNewCtrl', AugurNewCtrl)
      .controller('AugurAccuracyCtrl', AugurAccuracyCtrl)
      .controller('AugurAccuracyDetailCtrl', AugurAccuracyDetailCtrl)
      .controller('AugurInfluencersCtrl', AugurInfluencersCtrl)
      .controller('AugurPerformanceCtrl', AugurPerformanceCtrl)
      .controller('AugurSettingsCtrl', AugurSettingsCtrl)
      .controller('AugurTreeCtrl', AugurTreeCtrl)
      .controller('AugurProfileCtrl', AugurProfileCtrl)
      .controller('DashboardCtrl', DashboardCtrl);
});
