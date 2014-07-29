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
            $scope.headers = [
                {name: 'Variable'},
                {name: 'Total', count: profile.DataDictionary.Population.count},
            ];

            $scope.results = {};
            var types = [];

            angular.forEach(profile.DataDictionary.Population.fields, function(field, i){
                var res = {};
                if(field.data_type === 'categorical') {
                    res['data'] = field.instances[0];
                } else {
                    res['data'] = {'mean':field.mean,'max':field.maximum,'min':field.minimum}
                }
                res['type'] = field.data_type;

                var name = {'type': 'none', data:field.name};

                $scope.results[field.key] = [name, res];
                types.push(field.data_type);
            });

            angular.forEach(profile.Clusters, function(cluster) {
                $scope.headers.push({name: cluster.Name, count: cluster.count});
                angular.forEach(cluster.fields, function(field, i) {
                    var type = types[i];
                    var res = {};
                    if(type === 'categorical') {
                        res['data'] = field.instances[0];
                    } else {
                        res['data'] = {'mean':field.mean,'max':field.maximum,'min':field.minimum}
                    }
                    res['type'] = type;
                    $scope.results[field.key].push(res);
                });
            });

//            $scope.transformedData = results;
        });
    }];
});
