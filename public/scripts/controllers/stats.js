'use strict';

angular.module('GuessApp')
  .controller('StatsCtrl', function ($scope, Engine) {

    $scope.regions = Engine.regions();
    $scope.stats = Engine.stats();

    var statsPerRegion = {};

    $scope.statsForRegion = function(regionId) {
      if (!statsPerRegion[regionId]) {
        statsPerRegion[regionId] = findWhere($scope.stats.cities, { region: regionId });
      }

      return statsPerRegion[regionId];
    };

    function findWhere = function(list, props) {
      for (var i = 0, length = list.length; i < length; ++i) {
        var found = false;
        for (var k in props) {
          if (props.hasOwnProperty(k)) {
            found = list[i][k] == props[k];
          }
        }
        found && return list[i];
      }
      return null;
    }

  });
