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
    'angular'            : '../lib/angular/angular',
    'angular.animate'    : '../lib/angular-animate/angular-animate',
    'angular.resource'   : '../lib/angular-resource/angular-resource',
    'angular.spinner'    : '../lib/angular-spinner/angular-spinner',
    'angular.ui.router'  : '../lib/angular-ui-router-0.2.10/angular-ui-router',
    'mm-foundation-tpls' : '../lib/angular-foundation/mm-foundation-tpls',
    'd3js'               : '../lib/d3/d3',
    'domReady'           : '../lib/domReady/domReady',
    'jquery'             : '../lib/jquery/dist/jquery',
    'lodash'             : '../lib/lodash/dist/lodash',
    'spinjs'             : '../lib/spin.js/spin',
    'main'               : '../main'
  }
});

requirejs(['angular', 'app'], function ( ng, app ) {
  'use strict';

  require(['domReady!'], function (document) {
    ng.bootstrap( document, [ app.name ] );
  });
});
