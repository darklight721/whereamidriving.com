'use strict';

angular.module('whereAmIdrivingApp')
  .directive('map', function () {
    return {
      template: '<div class="map"></div>',
      restrict: 'E',
      replace: true,
      scope: { position: '@' },
      link: function postLink(scope, element) {
        var streetView;

        scope.$watch('position', function(position) {
          streetView = null;
          element.empty();

          if (!position) return;
          position = JSON.parse(position);

          streetView = new google.maps.StreetViewPanorama(element[0], {
            addressControl: false,
            linksControl: false,
            panControl: false,
            zoomControl: false,
            enableCloseButton: false,
            clickToGo: false,
            position: new google.maps.LatLng(position.lat, position.lng),
            pov: { heading: position.pov, pitch: 0 }
          });
        });
      }
    };
  });
