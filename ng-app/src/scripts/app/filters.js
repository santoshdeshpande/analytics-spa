/* global
 define: false,
 console: false
 */
define([
  'angular',
  'filters/checkmark'
], function (ng, Checkmark) {
  'use strict';

  return ng.module('dejalyticsFilters', [])
      .filter('checkmark', Checkmark);
});
