/* global
 define: false,
 console: false
 */
define([], function () {
    'use strict';

    return  ['$scope', '$stateParams', function ($scope) {
        $scope.augur.$promise.then(function (augur) {
            var profile = augur.clustering.clusterProfile;
            $scope.clusters = profile;
        });
    }];
});
