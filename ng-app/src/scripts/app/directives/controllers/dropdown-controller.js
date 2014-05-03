/* global
 define: false,
 console: false
 */

define([
], function () {
  'use strict';

  function controller($document, $scope, $timeout, $attrs, $element) {
    var dontHide;

    function close(ev) {
      var dropdownContentElement = $element[ 0 ].children[ 1 ];

      if (dontHide) {
        var t = ev.target;

        while (( t = t.parentNode )) {
          if (t === dropdownContentElement) {
            return false;
          }
        }
      }

      $scope.toggle(false);
    }

    function escapeKey(ev) {
      if (ev.which !== 27) {
        return false;
      }

      $scope.toggle(false);
    }

    function toggle(bool) {
      if (Boolean(bool) === bool) {
        $scope.toggled = bool;
      } else {
        $scope.toggled = !$scope.toggled;
      }

      if ($scope.toggled) {
        $timeout(function () {
          $document.bind('click', close);
          $document.bind('keydown', escapeKey);
        });
      } else {
        $timeout(function () {
          $document.unbind('click', close);
          $document.unbind('keydown', escapeKey);
        });
      }
    }

    $scope.toggled = false;
    $scope.toggle = toggle;

    $scope.$watch($attrs.label, function (label) {
      $scope.label = $scope.$eval($attrs.label);
    });

    if ($attrs.counter) {
      $scope.$watch($attrs.counter, function (counter) {
        $scope.counter = counter;
      });
    }

    if ('dontHide' in $attrs) {
      dontHide = true;
    }
  }

  return [ '$document', '$scope', '$timeout', '$attrs', '$element', controller ];
});
