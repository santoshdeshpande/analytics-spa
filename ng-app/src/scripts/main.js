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

    'angular.spinner' : {
      deps : [
        'angular',
        'spinjs'
      ]
    },

    'angular.ui.router' : {
      deps : [
        'angular'
      ]
    },

    d3js : {
      exports : 'd3'
    },

    jquery : {
      exports : '$'
    },

    lodash : {
      exports : '_'
    },

    'mm-foundation-tpls' : {
      deps : [
        'angular'
      ]
    }
  },

  paths : {
    'angular'            : '../lib/angular-1.2.9/angular',
    'angular.animate'    : '../lib/angular-1.2.9/angular-animate',
    'angular.resource'   : '../lib/angular-1.2.9/angular-resource',
    'angular.spinner'    : '../lib/angular-spinner-0.4.0/angular-spinner',
    'angular.ui.router'  : '../lib/angular-ui-router-0.2.10/angular-ui-router',
    'mm-foundation-tpls' : '../lib/angular-foundation-0.1.0/mm-foundation-tpls',
    'd3js'               : '../lib/d3-3.4.4/d3',
    'domReady'           : '../lib/domReady-2.0.1/domReady',
    'jquery'             : '../lib/jquery-1.10.2/jquery',
    'lodash'             : '../lib/lodash-2.4.1/lodash',
    'spinjs'             : '../lib/spinjs/spin',
    'main'               : '../main'
  }
});

requirejs(['angular', 'app'], function ( ng, app ) {
  'use strict';

  require(['domReady!'], function (document) {
    ng.bootstrap( document, [ app.name ] );
  });
});
