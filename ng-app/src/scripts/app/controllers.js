/* global
 define: false,
 console: false
 */
define([
  'angular',
  'services',
  'controllers/augur-new',
  'controllers/augur',
  'controllers/augur-influencers',
  'controllers/augur-performance',
  'controllers/augur-settings',
  'controllers/augur-tree',
  'controllers/dashboard'
], function (ng, services, AugurNewCtrl, AugurCtrl, AugurInfluencersCtrl, AugurPerformanceCtrl, AugurSettingsCtrl, AugurTreeCtrl, DashboardCtrl) {
  'use strict';

  return ng.module('MainControllers', [ services.name ])
      .controller('AugurCtrl', AugurCtrl)
      .controller('AugurNewCtrl', AugurNewCtrl)
      .controller('AugurInfluencersCtrl', AugurInfluencersCtrl)
      .controller('AugurPerformanceCtrl', AugurPerformanceCtrl)
      .controller('AugurSettingsCtrl', AugurSettingsCtrl)
      .controller('AugurTreeCtrl', AugurTreeCtrl)
      .controller('DashboardCtrl', DashboardCtrl);
});
