/* global
 define: false,
 console: false
 */
define([
  'angular.resource'
], function () {
  'use strict';

  return ['$resource', function ($resource) {
    return $resource('habitats/:habitatId/fact_tables/:factTableId.json', {
      // defaults for params
      habitatId: '@habitatId', factTableId: '@id'
    }, {
      // override actions
      query: { method: 'GET', params: { factTableId: 'fact_tables' }, isArray: true }
    });
  }];
});
