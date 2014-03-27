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
  'services/habitat'
], function (ng, ngResource, Augur, DataSource, FactTable, Habitat) {
  'use strict';

  return ng.module('dejalyticsServices', ['ngResource'])
      .factory('Augur', Augur)
      .factory('DataSource', DataSource)
      .factory('FactTable', FactTable)
      .factory('Habitat', Habitat);
});
