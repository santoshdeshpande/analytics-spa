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

    'angular.route' : {
      deps : [
        'angular'
      ]
    },

    'mm-foundation' : {
      deps : [
        'angular'
      ]
    },

    'mm-foundation-tpls' : {
      deps : [
        'mm-foundation'
      ]
    },

    jquery : {
      exports : '$'
    },

    lodash : {
      exports : '_'
    }
  },

  paths : {
    'angular'            : '../lib/angular-1.2.9/angular',
    'angular.animate'    : '../lib/angular-1.2.9/angular-animate',
    'angular.resource'   : '../lib/angular-1.2.9/angular-resource',
    'angular.route'      : '../lib/angular-1.2.9/angular-route',
    'mm-foundation'      : '../lib/angular-foundation-0.1.0/mm-foundation',
    'mm-foundation-tpls' : '../lib/angular-foundation-0.1.0/mm-foundation-tpls',
    'domReady'           : '../lib/domReady-2.0.1/domReady',
    'jquery'             : '../lib/jquery-1.10.2/jquery',
    'lodash'             : '../lib/lodash-2.4.1/lodash',
    'main'               : '../main'
  }
});

requirejs(['angular', 'app', 'mm-foundation', 'mm-foundation-tpls'], function ( ng, app ) {
  'use strict';

  require(['domReady!'], function (document) {
    ng.bootstrap( document, [ app.name ] );
  });
});
