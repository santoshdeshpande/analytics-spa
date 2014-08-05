/* global
 define: false,
 console: false
 */

define([
    '../constants'
], function (Constants) {
    'use strict';

    function directive($compile) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'partials/directives/augur-scheduler.html',
            scope: {
                schedule: "=",
                form: "=",
                prefix: "@"
            },
            link: function(scope, element, attrs) {
                scope.DAYS_OF_WEEK = Constants.DAYS_OF_WEEK;
                scope.SCHEDULE_TYPES = Constants.SCHEDULE_TYPES;
                scope.DAYS_IN_MONTH = Constants.DAYS_IN_MONTH;
                scope.name = scope.prefix + "-schedule-frequency";
                scope.hourlyName = scope.prefix + "HourlyField";
            }
        }
    }

    return directive;
});