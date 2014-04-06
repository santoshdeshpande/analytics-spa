/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', 'Augur', 'Habitat', function ($scope, $stateParams, Augur, Habitat) {

    function randomData() {
      var data = [];

      for(var i=0; i < 50; i++) {
        data.push([Math.random() * 100, Math.random() * 100])
      }

      return data.sort(function(a, b) { return parseFloat(a[0]) - parseFloat(b[0]) });
    }

    $scope.data = {
      lift                             : [
        [ 5, 1.969155654 ],
        [ 10, 1.898043767 ],
        [ 15, 1.844827586 ],
        [ 20, 1.881246919 ],
        [ 25, 1.543269231 ],
        [ 30, 1.596485411 ],
        [ 35, 1.617520715 ],
        [ 40, 1.561007958 ],
        [ 45, 1.543269231 ],
        [ 50, 0.745026525 ],
        [ 55, 0.632942889 ],
        [ 60, 0.319297082 ],
        [ 65, 0.337035809 ],
        [ 70, 0.439543673 ],
        [ 75, 0.478945623 ],
        [ 80, 0.44346817 ],
        [ 85, 0.386798432 ],
        [ 90, 0.212864721 ],
        [ 95, 0.266080902 ],
        [ 100, 0.281307951 ]
      ],
      response                         : randomData(),
      cumulativeResponse               : randomData(),
      capturedResponse                 : randomData(),
      cumulativeCapturedResponse       : randomData(),
      rocChart                         : [
        [0.0, 0.0],
        [0.01, 0.105943152],
        [0.00297619, 0.206718346],
        [0.014880952, 0.299741602],
        [0.026785714, 0.392764858],
        [0.044642857, 0.480620155],
        [0.06547619, 0.565891473],
        [0.083333333, 0.65374677],
        [0.116071429, 0.728682171],
        [0.172619048, 0.782945736],
        [0.261904762, 0.811369509],
        [0.345238095, 0.842377261],
        [0.4375, 0.865633075],
        [0.523809524, 0.894056848],
        [0.619047619, 0.914728682],
        [0.708333333, 0.940568475],
        [0.806547619, 0.958656331],
        [0.907738095, 0.974160207],
        [1.0, 1.0]
      ],
      classificationMatrix             : [
        { bucket: 'TN',  count: 990 },
        { bucket: 'FP', count: 126 },
        { bucket: 'FN', count: 266 },
        { bucket: 'TP',  count: 865 }
      ],
      modelPosteriorProbabilities      : randomData(),
      bayesCorrectedPriorProbabilities : randomData()
    }

  }];
});
