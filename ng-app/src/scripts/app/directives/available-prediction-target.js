/* global
 define: false,
 console: false
 */
define([
  'lodash'
], function (_) {
  'use strict';

  return function () {

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        function sanitizeInput(input) {
          var lodashTokens = _(input.replace(/;/g, ',').replace(/, */g, ',').replace(/ /g, ',').split(','));
          return lodashTokens.uniq().compact();
        }

        scope.$on('validate:predictionTargetIds', function (event, validIds, stepValidThreeCb) {
          scope.predictionTargetIdsValidated = true;
          scope.unrecognizedPredictionTargetIds = [];
          ngModel.$setValidity('present', true);
          ngModel.$setValidity('recognized', true);
          stepValidThreeCb(true);

          scope.candidateIds = sanitizeInput(ngModel.$viewValue);

          if (scope.candidateIds.isEmpty()) {
            ngModel.$setValidity('present', false);
            stepValidThreeCb(false);
            return undefined;
          }

          scope.candidateIds.forEach(function (candidateId) {
            if (validIds.indexOf(candidateId) === -1) {
              scope.unrecognizedPredictionTargetIds.push(candidateId);
            }
          });

          if (_.isEmpty(scope.unrecognizedPredictionTargetIds)) {
            return scope.candidateIds;
          } else {
            ngModel.$setValidity('recognized', false);
            stepValidThreeCb(false);
            return undefined;
          }
        });
      }
    };
  }
});
