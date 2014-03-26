/* global
 define: false,
 console: false
 */
define([
  'angular',
  'angular.animate',
  'animations/augur'
], function ( ng, ngAnimate, Augur ) {
  'use strict';

  return ng.module('dejalyticsAnimations', ['ngAnimate'])
    .animation('.augur', Augur);

});
