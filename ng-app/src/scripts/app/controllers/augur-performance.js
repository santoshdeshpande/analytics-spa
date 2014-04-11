/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  function randomData() {
    var arr = [];
    var kpi = [
        Math.random() * 0.4 + 0.2,
        Math.random() * 0.4 + 0.2,
        Math.random() * 0.4 + 0.2,
        Math.random() * 0.4 + 0.2,
        Math.random() * 0.4 + 0.2,
        Math.random() * 0.4 + 0.2,
        Math.random() * 0.4 + 0.2,
        Math.random() * 0.4 + 0.2
    ];
    var days = (Math.round(Math.random() * 15) + 15);

    for (var i = 0; i < days; i++) {
      var dateOffset = (24*60*60*1000) * (days - i);
      var myDate = new Date();
      myDate.setTime(myDate.getTime() - dateOffset);

      arr.push({drift: Math.random() * 0.8 + 0.2, kpi: kpi[Math.floor(i/7)], date: myDate})
    }

    return arr
  }

  return  ['$state', '$scope', '$stateParams', 'Augur', 'Habitat', function ($state, $scope, $stateParams, Augur, Habitat) {
    $scope.trackCurrentState($state.current.name); // inherited from parent augur.js

    $scope.data = randomData();
  }];
});
