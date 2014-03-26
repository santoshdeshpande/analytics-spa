/* global
 define: false,
 console: false
 */

require.config({
  baseUrl : '../src/scripts/app',

  urlArgs : 'nocache=' + ( new Date() ).getTime(),

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

    jquery : {
      exports : '$'
    },

    lodash : {
      exports : '_'
    }
  },

  paths : {
    'spec'             : '../../../spec',

    'angular'          : '../lib/angular-1.2.9/angular',
    'angular.animate'  : '../lib/angular-1.2.9/angular-animate',
    'angular.mocks'    : '../lib/angular-1.2.9/angular-mocks',
    'angular.resource' : '../lib/angular-1.2.9/angular-resource',
    'angular.route'    : '../lib/angular-1.2.9/angular-route',
    'domReady'         : '../lib/domReady-2.0.1/domReady',
    'jquery'           : '../lib/jquery-1.10.2/jquery',
    'lodash'           : '../lib/lodash-2.4.1/lodash'
  }
});

requirejs(['jquery', 'angular', 'app'], function ( $) {
  'use strict';

  require(['domReady!'], function (document) {
    var specFiles = [];
    $('#specFiles li').each(function(idx, ele) {
      specFiles.push($(ele).text().replace('.js', ''));
    });

    require(specFiles, function () {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.addReporter(new jasmine.HtmlReporter);

      jasmineEnv.execute();
    })
  });
});
