/* global
 define: false,
 console: false
 */
define([], function () {
    'use strict';

    return  ['$scope', '$stateParams', function ($scope) {
        $scope.data = {};

        $scope.augur.$promise.then(function (augur) {
            var profile = augur["clustering"]['clusterProfile'];
            console.log(profile);
            $scope.headers = [
                {name: 'Variable'},
                {name: 'Values'}
            ];
            angular.forEach(profile.Clusters, function(cluster, i) {
                $scope.headers.push({name: cluster.Name, count: cluster.count});
            });

        });
    }];
});
