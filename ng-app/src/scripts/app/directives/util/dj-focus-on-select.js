/* global
 define: false,
 console: false
 */

define([
], function () {
    'use strict';
    function directive($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                console.log(attrs.djFocusOnSelect);
                scope.$watch(attrs.djFocusOnSelect, function(newValue) {
                    console.log(attrs.valueToWatch);
                    if(newValue && newValue == attrs.valueToWatch) {
                        $timeout(function() {
                            element.focus();
                        }, 100);
                    }
                })
            }

        }
    }

    return directive;
});
