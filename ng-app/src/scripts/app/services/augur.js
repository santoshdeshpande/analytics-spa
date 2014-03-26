/* global
 define: false,
 console: false
 */
define([
  'angular.resource'
], function () {
  'use strict';

  return ['$resource', function ($resource) {
    return $resource('/api/v1/augurs/:augurId.json', {}, {
      query: { method: 'GET', params: { augurId: 'augurs' }, isArray: true }
    });
  }];
});
