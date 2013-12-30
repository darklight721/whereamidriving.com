'use strict';

angular.module('whereAmIdrivingApp')
  .controller('StatsCtrl', function ($scope, Server) {

    Server.stats().then(function(data) {
      var groupedCityStats = _.groupBy(data.cityStats, function(cityStat) {
        return cityStat.region;
      });

      $scope.stats = _.reduce(data.regionStats, function(stats, regionStat) {
        var cityStats = groupedCityStats[regionStat.name] || data.cityStats;
        stats.push({
          region: regionStat.name,
          total: regionStat.total,
          count: regionStat.count,
          cities: cityStats.length,
          easiestCity: _.max(cityStats, getCityStat).name,
          hardestCity: _.min(cityStats, getCityStat).name
        });
        return stats;
      }, []);
    });

    function getCityStat(cityStat) {
      return cityStat.stats / cityStat.counter;
    }

  });
