/* global
 define: false,
 console: false
 */
define([
  'angular',
  'angular.resource',
  'services/augur',
  'services/datasource',
  'services/facttable',
  'services/flash-messages',
  'services/habitat'
], function (ng, ngResource, Augur, DataSource, FactTable, FlashMessages, Habitat) {
  'use strict';

  return ng.module('dejalyticsServices', ['ngResource'])
      .factory('Augur', Augur)
      .factory('DataSource', DataSource)
      .factory('FactTable', FactTable)
      .factory('FlashMessages', FlashMessages)
      .factory('Habitat', Habitat);
});
