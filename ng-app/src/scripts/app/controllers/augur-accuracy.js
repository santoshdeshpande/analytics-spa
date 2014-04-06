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
      response                         : [
        [ 5, 0.991150442 ],
        [ 10, 0.955357143 ],
        [ 15, 0.928571429 ],
        [ 20, 0.946902655 ],
        [ 25, 0.776785714 ],
        [ 30, 0.803571429 ],
        [ 35, 0.814159292 ],
        [ 40, 0.785714286 ],
        [ 45, 0.776785714 ],
        [ 50, 0.375 ],
        [ 55, 0.318584071 ],
        [ 60, 0.160714286 ],
        [ 65, 0.169642857 ],
        [ 70, 0.221238938 ],
        [ 75, 0.241071429 ],
        [ 80, 0.223214286 ],
        [ 85, 0.194690265 ],
        [ 90, 0.107142857 ],
        [ 95, 0.133928571 ],
        [ 100, 0.14159292 ]
      ],
      cumulativeResponse               : [
        [ 5, 0.991150442 ],
        [ 10, 0.973333333 ],
        [ 15, 0.958456973 ],
        [ 20, 0.955555556 ],
        [ 25, 0.919928826 ],
        [ 30, 0.900593472 ],
        [ 35, 0.888182973 ],
        [ 40, 0.87541713 ],
        [ 45, 0.864490603 ],
        [ 50, 0.815672306 ],
        [ 55, 0.770226537 ],
        [ 60, 0.71958457 ],
        [ 65, 0.67739726 ],
        [ 70, 0.644628099 ],
        [ 75, 0.617804154 ],
        [ 80, 0.593210907 ],
        [ 85, 0.569633508 ],
        [ 90, 0.544015826 ],
        [ 95, 0.522492971 ],
        [ 100, 0.503337784 ]
      ],
      capturedResponse                 : [
        [ 5, 0.099027409 ],
        [ 10, 0.094606543 ],
        [ 15, 0.091954023 ],
        [ 20, 0.094606543 ],
        [ 25, 0.076923077 ],
        [ 30, 0.079575597 ],
        [ 35, 0.081343943 ],
        [ 40, 0.07780725 ],
        [ 45, 0.076923077 ],
        [ 50, 0.037135279 ],
        [ 55, 0.031830239 ],
        [ 60, 0.015915119 ],
        [ 65, 0.016799293 ],
        [ 70, 0.022104332 ],
        [ 75, 0.023872679 ],
        [ 80, 0.022104332 ],
        [ 85, 0.019451813 ],
        [ 90, 0.01061008 ],
        [ 95, 0.013262599 ],
        [ 100, 0.014146773 ]
      ],
      cumulativeCapturedResponse       : [
        [ 5, 0.099027409 ],
        [ 10, 0.193633952 ],
        [ 15, 0.285587975 ],
        [ 20, 0.380194518 ],
        [ 25, 0.457117595 ],
        [ 30, 0.536693192 ],
        [ 35, 0.618037135 ],
        [ 40, 0.695844385 ],
        [ 45, 0.772767462 ],
        [ 50, 0.809902741 ],
        [ 55, 0.84173298 ],
        [ 60, 0.857648099 ],
        [ 65, 0.874447392 ],
        [ 70, 0.896551724 ],
        [ 75, 0.920424403 ],
        [ 80, 0.942528736 ],
        [ 85, 0.961980548 ],
        [ 90, 0.972590628 ],
        [ 95, 0.985853227 ],
        [ 100, 1.0 ]
      ],
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
      modelPosteriorProbabilities      : [
        [ 0.16828479, 454 ],
        [ 0.180288462, 599 ],
        [ 0.345454545, 80 ],
        [ 0.34939759, 123 ],
        [ 0.825396825, 485 ],
        [ 0.857142857, 21 ],
        [ 0.875, 22 ],
        [ 0.935810811, 388 ],
        [ 1.0, 75 ]
      ],
      bayesCorrectedPriorProbabilities : [
        [ 0.16828479, 454 ],
        [ 0.180288462, 599 ],
        [ 0.345454545, 80 ],
        [ 0.34939759, 123 ],
        [ 0.825396825, 485 ],
        [ 0.857142857, 21 ],
        [ 0.875, 22 ],
        [ 0.935810811, 388 ],
        [ 1.0, 75 ]
      ]
    }

  }];
});
