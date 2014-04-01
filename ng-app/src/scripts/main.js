/* global
 define: false,
 console: false
 */

require.config({
  shim : {
    angular : {
      deps : [
        'domReady',
        'jquery'
      ],
      exports : 'angular'
    },

    'angular.animate' : {
      deps : [
        'angular'
      ]
    },

    'angular.resource' : {
      deps : [
        'angular'
      ]
    },

    'angular.ui.router' : {
      deps : [
        'angular'
      ]
    },

    jquery : {
      exports : '$'
    },

    lodash : {
      exports : '_'
    },

    'mm-foundation' : {
      deps : [
        'angular'
      ]
    }
  },

  paths : {
    'angular'            : '../lib/angular-1.2.9/angular',
    'angular.animate'    : '../lib/angular-1.2.9/angular-animate',
    'angular.resource'   : '../lib/angular-1.2.9/angular-resource',
    'angular.ui.router'  : '../lib/angular-ui-router-0.2.10/angular-ui-router',
    'mm-foundation-tpls' : '../lib/angular-foundation-0.1.0/mm-foundation-tpls',
    'domReady'           : '../lib/domReady-2.0.1/domReady',
    'jquery'             : '../lib/jquery-1.10.2/jquery',
    'lodash'             : '../lib/lodash-2.4.1/lodash',
    'main'               : '../main'
  }
});

requirejs(['angular', 'app'], function ( ng, app ) {
  'use strict';

  require(['domReady!'], function (document) {
    ng.bootstrap( document, [ app.name ] );
  });
});
