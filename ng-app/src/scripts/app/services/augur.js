/* global
 define: false,
 console: false
 */
define([
  'angular.resource'
], function () {
  'use strict';

  return ['$resource', function ($resource) {
    return $resource('/api/v1/habitats/:habitatId/augurs/:augurId', {
      augurId: '@id',
      habitatId: '@habitatId'
    }, {
      status: {
        method: 'GET',
        url: '/api/v1/habitats/:habitatId/augurs/:augurId/status'
      },
      update: {
        method: 'PUT'
      },
      schedule: {
        method: 'POST',
        url: '/api/v1/habitats/:habitatId/augurs/:augurId/schedule/:stuff'
      }
    });
  }];
});
