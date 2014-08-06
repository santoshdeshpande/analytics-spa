/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  function FlashMessages( $timeout ) {
    var message;

    this.setMessage = function (msg) {
      message = msg;
      return message;
    };

    this.getMessage = function () {
      $timeout(function () {
        message = '';
      }, 1000);

      return message;
    };
  }

  return ['$timeout', function ( $timeout ) {
    return new FlashMessages($timeout);
  }];
});
