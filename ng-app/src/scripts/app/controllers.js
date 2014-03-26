/* global
 define: false,
 console: false
 */
define([
  'angular',
  'services',
  'controllers/augurlist',
  'controllers/augurdetail',
  'controllers/augurnew',
  'controllers/dashboard'
], function (ng, services, AugurListCtrl, AugurDetailCtrl, AugurNewCtrl, DashboardCtrl) {
  'use strict';

  return ng.module('MainControllers', [ services.name ])
      .controller('AugurListCtrl', AugurListCtrl)
      .controller('AugurDetailCtrl', AugurDetailCtrl)
      .controller('AugurNewCtrl', AugurNewCtrl)
      .controller('DashboardCtrl', DashboardCtrl);
});
