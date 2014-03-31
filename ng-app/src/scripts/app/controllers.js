/* global
 define: false,
 console: false
 */
define([
  'angular',
  'services',
  'controllers/augurdetail',
  'controllers/augurnew',
  'controllers/dashboard'
], function (ng, services, AugurDetailCtrl, AugurNewCtrl, DashboardCtrl) {
  'use strict';

  return ng.module('MainControllers', [ services.name ])
      .controller('AugurDetailCtrl', AugurDetailCtrl)
      .controller('AugurNewCtrl', AugurNewCtrl)
      .controller('DashboardCtrl', DashboardCtrl);
});
