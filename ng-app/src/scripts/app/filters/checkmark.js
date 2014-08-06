/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return function () {
    return function (input) {
      return input ? '\u2713' : '\u2718';
    };
  };
});
