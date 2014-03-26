/* global
 define: false,
 console: false
 */
define([
  'angular.resource'
], function () {
  'use strict';

  return ['$resource', function ($resource) {
    return $resource('/api/v1/habitats/:habitatId.json', {}, {
      query: { method: 'GET', params: { habitatId: 'habitats' }, isArray: true }
    });
  }];
});
