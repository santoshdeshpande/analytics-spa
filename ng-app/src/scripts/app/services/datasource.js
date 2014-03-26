/* global
 define: false,
 console: false
 */
define([
  'angular.resource'
], function () {
  'use strict';

  return ['$resource', function ($resource) {
    return $resource('habitats/:habitatId/data_sources/:dataSourceId.json', {
      // defaults for params
      habitatId: '@habitatId', dataSourceId: '@id'
    }, {
      // override actions
      query: { method: 'GET', params: { dataSourceId: 'data_sources' }, isArray: true }
    });
  }];
});
