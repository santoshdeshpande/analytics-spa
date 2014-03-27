/* global
 define: false,
 console: false
 */
define([
  'angular.resource'
], function () {
  'use strict';

  return ['$resource', function ($resource) {
    return $resource('habitats/:habitatId/data_sources/:dataSourceId', { habitatId: '@habitatId', dataSourceId: '@id' });
  }];
});
