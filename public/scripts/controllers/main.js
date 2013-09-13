'use strict';

angular.module('GuessApp')
  .controller('MainCtrl', function ($scope, $location, Engine, Record) {

    $scope.regions = Engine.regions();

    $scope.play = function(region) {
      Engine.generate(region).then(function(){
        Record.new(Engine.levels());
        $location.path('/play/1');
      });
    };

  });
